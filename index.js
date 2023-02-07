const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const productRouter = require("./Routes/products.route");
const errorHandler = require("./middleware/errorHnadler");
const { connectToServer } = require("./Utils/dbConnect");


//middleware
app.use(cors());
app.use(express.json());



// Apply the rate limiting middleware to all requests
// app.use(limiter)

// app.use(viewCount);

connectToServer((err)=>{
  if(!err){
    app.listen(port, () => {
      console.log(port)
      console.log(`listening on port  ${port}`);
    });
  }
  else{
    console.log(err)
  }
})

app.use("/api/products", productRouter);

async function run() {
  try {
    // await client.connect();
    // const stockProduct =client.db("zeroPoint").collection("product")
    // app.get('/products',async(req,res)=>{
    //     const query ={}
    //     const cursor = stockProduct.find(query);
    //     const products =await cursor.toArray();
    //     res.json(products);
    // });
    // app.get('/products/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const query = {_id:ObjectId(id)}
    //     const products= await stockProduct.findOne(query);
    //    res.send(products)
    // });
    // //add products
    // app.post('/products',async(req,res)=>{
    //     const doc=req.body;
    //     const result = await stockProduct.insertOne(doc)
    //     res.send(result)
    // });
    // //DELETE
    // app.delete('/products/:id', async(req,res)=>{
    //     const id =req.params.id;
    //     const query ={_id:ObjectId(id)};
    //     const result =await stockProduct.deleteOne(query);
    //     res.send(result)
    // })
    // // delivered (update)
    // app.put('/products/:id', async(req,res)=>{
    //     const id =req.params.id;
    //     const updateProduct=req.body.quantities;
    //     const filter={_id:ObjectId(id)};
    //     const options ={upsert:true};
    //     const updateDoc={
    //         $set:{
    //             quantity:updateProduct
    //         },
    //     };
    //     const result = await stockProduct.updateOne(filter, updateDoc,options);
    //     res.send(result)
    // });
    // app.post('/addProducts',async(req,res)=>{
    //     const email =req.query.email;
    //     const query ={email}
    //     const cursor = stockProduct.find(query);
    //     const addProducts =await cursor.toArray();
    //     res.send(addProducts);
    // });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("yes running key-two-telecom server site");
});

app.use(errorHandler)

// app.listen(port, () => {
//   console.log(port)
//   console.log(`listening on port  ${port}`);
// });

process.on("unhandledRejection", (error) => {
  console.log(error.name,error.message);
  app.close(()=>{
    process.exit(1);
  });
})
