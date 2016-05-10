s=db.find()
s=[i["data"] for i in s]
for instruct in s:
	print instruct
	i=[ins.lower() for ins in instruct]
	execute(i)
db3.delete_many({})