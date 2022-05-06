const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port =process.env.PORT ||5000;
const app = express();
 
//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@cluster0.l4jqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log('yes mongodb connected');
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});







app.get('/',(req,res)=>{
    res.send('yes running key two server');
})

app.listen(port,()=>{
    console.log('listening on port 5000');
})
//zero-point
//fGs8uyr2WrvmTDT5