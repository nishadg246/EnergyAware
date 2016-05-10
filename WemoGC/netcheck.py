import subprocess
from pymongo import MongoClient
from datetime import datetime

mongo = MongoClient('www.nishadg.com:27017')
db = mongo.wemo.ips
db2 = mongo.wemo.reading
e=pytz.timezone("US/Eastern")


ips=[]
for d in db.find():
	ips.append(d["ip"])

def job():
	b=False
	for ip in ips:
	    res = subprocess.call(['ping', '-c', '3', iip])
	    if res == 0:
	        b=True
	if b:
		db.insert_one({"time":datetime.now(tz=e).isoformat(),"name":"occ","data":1})
	else:
		db.insert_one({"time":datetime.now(tz=e).isoformat(),"name":"occ","data":0})
		
while True:
	job()
	time.sleep(120)

	
