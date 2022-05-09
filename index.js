const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();
const port =process.env.PORT || 5000;
const app = express();
 
//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l4jqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run(){
    try{
        await client.connect();
        const stockProduct =client.db("zeroPoint").collection("product")
        app.get('/products',async(req,res)=>{
            const query ={}
            const cursor = stockProduct.find(query);
            const products =await cursor.toArray();
            res.json(products);
        });
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const products= await stockProduct.findOne(query);
           res.send(products) 
        });
        //add products
        app.post('/products',async(req,res)=>{
            const doc=req.body;
            const result = await stockProduct.insertOne(doc)
            res.send(result)
        });
        //DELETE
        app.delete('/products/:id', async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)};
            const result =await stockProduct.deleteOne(query);
            res.send(result)
        })

        

        // delivered (update)
        app.put('/products/:id', async(req,res)=>{
            const id =req.params.id;
            const updateProduct=req.body.quantities;
            const filter={_id:ObjectId(id)};
            const options ={upsert:true};
            const updateDoc={
                $set:{
                    quantity:updateProduct
                },

            };
            const result = await stockProduct.updateOne(filter, updateDoc,options);
            res.send(result)
        });
        app.post('/addProducts',async(req,res)=>{
            const email =req.query.email;
            const query ={email}
            const cursor = stockProduct.find(query);
            const addProducts =await cursor.toArray();
            res.send(addProducts);
        });


        
    }
    finally{

    }
}
run().catch(console.dir)






app.get('/',(req,res)=>{
    res.send('yes running key-two-telecom server site');
})

app.listen(port,()=>{
    console.log('listening on port 5000');
})
