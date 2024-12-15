const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });







const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bibektotol:1234@cluster0.28bsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bibekcollection = client.db("Bibek").collection("database");
    const reviewscollection = client.db("Bibek").collection("reviews");
    // Send a ping to confirm a successful connection
    app.get("/coffee", async (req, res) => {
      
      const result = await bibekcollection.find().toArray();
      res.send(result);
    })



    app.post ("/reviews", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await reviewscollection.insertOne(data);
      res.send(result);

    })



    app.get("/reviews", async (req, res) => {
      
      const result = await reviewscollection.find().toArray();
      res.send(result);
    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await client.db("admin").command({ ping: 1 });



   

   
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


const users =[
  {id:1, name:'sakib', email:'sakib@com'},
  {id:2, name:'sakib', email:'sakib@com'},
  {id:3, name:'sakib', email:'sakib@com'},

]
// Root endpoint
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });


app.get("/users", (req, res) => {
  res.send(users);
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
