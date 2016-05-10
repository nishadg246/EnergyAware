from ouimeaux.environment import Environment
from pymongo import MongoClient
import time
import pytz
import os
from datetime import datetime
from twilio.rest import TwilioRestClient
from timeout import timeout
import sys
import subprocess

# Twilio text func
account_sid = "AC760a4ad9d6624d2bebf0c4acf632de6c"
auth_token  = "884e32d004ede86dc6e458ca82a66de2"
client = TwilioRestClient(account_sid, auth_token)
def text(s):
	message = client.messages.create(body=s,to="+16107149355",from_="+12672625546")
	return message.sid
# text("System Started...")

# TimeZone
e=pytz.timezone("US/Eastern")

# Database setup
mongo = MongoClient('www.nishadg.com:27017')
db = mongo.wemo.reading
db2 = mongo.wemo.state
db3 = mongo.wemo.todo
db4 = mongo.wemo.names
db5 = mongo.wemo.ips
db6 = mongo.wemo.err

devicemap={}
for d in db4.find():
	devicemap[d['name']] = [int(d['level']),d['nick']]
print devicemap
nicknames={}
for d in db4.find():
	nicknames[d['nick']] = d['name']
print nicknames

# Switch Acquisition
def on_switch(switch):
	print "Switch found!", switch.name
def on_motion(motion):
	print "Motion found!", motion.name
env = Environment(on_switch, on_motion)
env.start()
switches=env.list_switches()

# switchpair matches names to switch obj
switchpair={}
for s in switches:
	if s in devicemap.keys():
		switchpair[s]=env.get_switch(s)
print switchpair

# get ips to look for
ips=[]
for d in db5.find():
	ips.append(d["ip"])

#interval
interval = int(sys.argv[1])

#import applications:
f=os.listdir("apps")
f=[t for t in f if ".py" in t]
apps=[]
for app in f:
	name=app[:-3]
	modname="apps."+name
	t=__import__(modname,fromlist=['']) 
	apps.append((t.appname,t.exectime))


@timeout(4)
def getwrap(sw):
	return (sw.current_power,sw.today_kwh,sw.today_on_time)

@timeout(4)
def getSwitch(s):
	if s in switchpair:
		return switchpair[s]
	elif s in nicknames and nicknames[s] in switchpair:
		return switchpair[nicknames[s]]
	return None

@timeout(4)
def execute(s):
	print s
	print nicknames
	if "turn" in s:
		s.remove("turn")
		if "off" in s:
			s.remove("off")
			temp = getSwitch(s[0])
			if temp:
				temp.off()
		else:
			s.remove("on")
			temp = getSwitch(s[0])
			if temp:
				temp.on()
	elif "switch" in s:
		s.remove("switch")
		if "off" in s:
			s.remove("off")
			temp = getSwitch(s[0])
			if temp:
				temp.off()
		else:
			s.remove("on")
			temp = getSwitch(s[0])
			if temp:
				temp.off()
	elif "is" in s:
		s.remove("is")
		temp = getSwitch(s[0])
		if temp:
			if temp.get_state():
				text("its on")
			else:
				text("its off")
	else:
		return None


prev={}
mods=0
away =0
sent=False
def job():
	global mods
	global prev
	global away
	totpw=0
	totkwh=0
	toton=0
	count=0
	for s in switchpair.keys():
		sw=switchpair[s]
		t=None
		try: 
			t=getwrap(sw)
		except:
			 pass
		if t!=None:
			print (s,t)
			if s in prev:
				if t[0]==0 and prev[s]>0:
					#db2.insert_one({"time":datetime.now(tz=e).isoformat(),"name":s,"change":"off"})
				elif t>0 and prev[s]==0:
					#db2.insert_one({"time":datetime.now(tz=e).isoformat(),"name":s,"change":"on"})
			prev[s]=t[0]
			#db.insert_one({"time":datetime.now(tz=e).isoformat(),"name":s,"pwr":t[0],"teng":t[1],"ton":t[2]})
			if devicemap[s][0]==1:
				totpw+=t[0]
				totkwh+=t[1]
				toton+=t[2]
				count+=1
	if count:
		print totpw
		#db.insert_one({"time":datetime.now(tz=e).isoformat(),"name":"total","pwr":totpw,"teng":totkwh,"ton":toton})

	# execute instructions
	s=db3.find()
	s=[i["data"] for i in s]
	db3.delete_many({})
	for instruct in s:
		print instruct
		i=[ins.lower() for ins in instruct]
		execute(i)
	

	# check occupancy
	if mods%24==0:
		b=False
		for ip in ips:
		    res = subprocess.call(['ping', '-c', '3', ip])
		    if res == 0:
		        b=True
		        break
		if b:
			away=0
			sent=False
			#db.insert_one({"time":datetime.now(tz=e).isoformat(),"name":"occ","data":1})
		else:
			away+=1
			#db.insert_one({"time":datetime.now(tz=e).isoformat(),"name":"occ","data":0})
	mods=(mods+1)%24
	if away>10 and not sent:
		sent=True
		for d in devicemap:
			[l,r]=devicemap[d]
			if l==2:
				text(r)
				execute(['is',r,'on'])


while True:
	job()
	time.sleep(interval)

import atexit

@atexit.register
def leaving():
	text("System Exiting...")
	db6.insert_one({"time":datetime.now(tz=e).isoformat(),"id":1})
	client.close()


