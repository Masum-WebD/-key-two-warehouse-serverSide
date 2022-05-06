const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();
const port =process.env.PORT ||5000;
const app = express();
 
//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Pass}@cluster0.l4jqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run(){
    try{
        await client.connect();
        const stockProduct =client.db("zeroPoint").collection("product")
        app.get('/products',async(req,res)=>{
            const query ={}
            const cursor = stockProduct.find(query);
            const products =await cursor.toArray();
            res.send(products);
        
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const service= await stockProduct.findOne(query);
           res.send(service) 
        });
        })
    }
    finally{

    }
}
run().catch(console.dir)






app.get('/',(req,res)=>{
    res.send('yes running key two server');
})

app.listen(port,()=>{
    console.log('listening on port 5000');
})
//zero-point
//fGs8uyr2WrvmTDT5