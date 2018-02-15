# `big-shovel`

## Getting The Sources

```sh
git clone https://github.com/another-guy/big-shovel.git

( cd service; npm install )
( cd spa; npm install )
```

## Demo Database Setup via MongoDB

### MongoDB Installation

Download MongoDB Community Server from `https://www.mongodb.com/download-center?jmp=nav#community`.

Install as a "Complete" version.

Make sure Git Bash has Mongo commands in PATH environment variable.
You likely need to update `~/.bash_profile` and add a line similar to the following one:

```sh
export PATH=/c/Program\ Files/MongoDB/Server/3.6/bin:$PATH
```

Open a **NEW** Git Bash tab/instance and run this command to verify setup:

```
mongo --version

MongoDB shell version v3.6.2
git version: 489d177dbd0f0420a8ca04d39fd78d0a2c539420
OpenSSL version: OpenSSL 1.0.1u-fips  22 Sep 2016
allocator: tcmalloc
modules: none
build environment:
    distmod: 2008plus-ssl
    distarch: x86_64
    target_arch: x86_64
```

### Restore Database From Test Data

Create a directory for a DB instance and launch one.

```sh
mkdir /c/temp/my-logs-test-db
mongod --dbpath /c/temp/my-logs-test-db
```

Run the following commands in Git Bash to restore the database.

**MAKE SURE YOUR WORKING DIRECTORY IS "`test-log-data`"**

```sh
for collection_file in $(ls); do mongoimport --db myTestDb --collection myLogCollection --file ${collection_file}; done

2018-02-14T21:45:38.070-0800    connected to: localhost
2018-02-14T21:45:38.076-0800    imported 5 documents
2018-02-14T21:45:39.622-0800    connected to: localhost
2018-02-14T21:45:39.629-0800    imported 6 documents
2018-02-14T21:45:41.165-0800    connected to: localhost
2018-02-14T21:45:41.174-0800    imported 23 documents
2018-02-14T21:45:42.680-0800    connected to: localhost
2018-02-14T21:45:42.690-0800    imported 23 documents
2018-02-14T21:45:44.166-0800    connected to: localhost
2018-02-14T21:45:44.176-0800    imported 20 documents
2018-02-14T21:45:45.702-0800    connected to: localhost
2018-02-14T21:45:45.710-0800    imported 8 documents
2018-02-14T21:45:47.183-0800    connected to: localhost
2018-02-14T21:45:47.191-0800    imported 1 document
```

### Verify Database Restoration

Just play around the database instance if you want.

```sh
mongo port=27017

use myTestDb
show collections

db.myLogCollection.find()
db.myLogCollection.find({ level: "ERROR" })
db.myLogCollection.find({ "payload.employeeId": "30058622" })
db.myLogCollection.find({ level: "INFO", "payload.employeeId": "30058622" })
db.myLogCollection.find({ time: { "$gt": "2018-02-07 12:10", "$lt": "2018-02-07 12:30" } })
```

### Troubleshooting

If you observe an error `[main] Error loading history file: FileOpenFailed: Unable to fopen() file C:\Users\<USERNAME>/.dbshell: The system cannot find the file specified.` run this:

```sh
echo "" > ~/.dbshell && chmod 0 ~/.dbshell
```

## Hotel Setup

```sh
npm install -g hotel

# from `spa` directory
hotel add 'json-server -p 3001 logs-fake-db.json' -p 3001 -n big-shovel-fake-db -o big-shovel-fake-db.log

hotel add 'ng serve' -p 4200 -n big-shovel-spa -o big-shovel.log

hotel add 'mongod --dbpath C:\temp\my-logs-test-db' -p 27017 -n big-shovel-mongo -o big-shovel-mongo.log

# from `service` directory
hotel add 'node ./node_modules/typescript/bin/tsc && node ./dist/index.js -p 3003' -p 3003 -n big-shovel-service -o big-shovel-service.log
```