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
db.authorized_admins.save(
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
# Refer to the corresponding *schema.json document for info
```

###### Import data
```bash
mongoimport --db provisioning --collection machines --file machines-sample.json
```

###### Use

```bash
db.authorized_admins.find({$text:{$search:"cool.guy"}})
```


## NodeJS Notes

###### Server Software Setup

```bash
npm install
```

###### Running
```bash
node index.js
```

###### Terminating
Control + C
