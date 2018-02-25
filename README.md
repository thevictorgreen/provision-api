# Server Provisioning API

## Mongo DB Notes

###### Database Setup

```bash
mongo

db

show databases

use provisioning

show collections

db.createCollection("machines")

db.createCollection("authorized_admins")

db.createCollection("software")
```


###### Enable Full Text Search

```bash
db.machines.ensureIndex({tags:"text"})

db.authorized_admins.ensureIndex({tags:"text"})

db.software.ensureIndex({tags:"text"})
```


###### Insert data

```bash
db.machines.save(
 {
   "cac_id":"12345",
   "username":"cool.guy",
   "password":"password",
   "tags":[
     "12345",
     "cool.guy"
   ]
  }
)

# Include _id to update existing document
```

###### Use

```bash
db.machines.find({$text:{$search:"hostname"}})
```
