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

Use

```bash
db.machines.find({$text:{$search:"hostname"}})
```
