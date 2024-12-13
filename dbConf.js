const {MongoClient, ObjectId} = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'ZenClass'

module.exports = {client, dbName, ObjectId}