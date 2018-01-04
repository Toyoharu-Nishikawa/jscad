var express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var assert = require('assert')

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());

var insertDocuments = function(client, dbName, collectionName, response, query) {
  let db = client.db(dbName);
  let collection = db.collection(collectionName);
  // Insert some documents
  collection.insertOne(query, function(err, result) {
  assert.equal(err, null);
  //assert.equal(3, result.result.n);
  //assert.equal(3, result.ops.length);
  console.log("Inserted 3 documents into the collection");
  //response.send(JSON.stringify({flag:"ok"}));
  response.send("success")
  });
}
var findDocuments = function(client, dbName, collectionName, response, query) {
  // Get the documents from collection
  let db = client.db(dbName);
  let collection = db.collection(collectionName);
  collection.find(query).toArray((err,result)=>{
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(result);
    response.send(result);
    client.close();
  });
 }

//conection URL
const url = 'mongodb://jscad_mongo_1:27017';
const dbName = 'watchable';
const collectionName = 'plotly';
app.set('port', 5000);
app.use(express.static(__dirname + '/public'));

app.get('/watchable/test', function(request, response) {
  //use connect method to connect to server
  response.send('this is test page of node js ');
});

app.get('/watchable/find', function(request, response) {
  //use connect method to connect to server
  MongoClient.connect(url, (error,client)=>{
    assert.equal(null,error)
    console.log("connected correctly to server");
    query = {};
    findDocuments(client, dbName, collectionName, response, query);
  });
});
app.all('/watchable/data_registry', function(request, response) {
  //use connect method to connect to server
  MongoClient.connect(url, (error,client)=>{
    assert.equal(null,error)
    console.log("connected correctly to server");
    console.log(request.body);
    query = request.body;
    console.log("query",query)
    insertDocuments(client, dbName, collectionName, response, query);
  });
});


app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'))
});
