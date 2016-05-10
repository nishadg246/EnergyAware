from ouimeaux.environment import Environment
from pymongo import MongoClient
import threading

client = MongoClient('www.nishadg.com:27017')

db = client.wemo.reading

d = db.find()

a=[]
b=[]
c=[]
for i in d:
	a+=[i['a']]
	b+=[i['b']]
	c+=[i['c']]

text_file = open("o.txt", "w")
text_file.write(str([a,b,c]))
text_file.close()
