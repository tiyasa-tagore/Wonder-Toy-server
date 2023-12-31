const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// // Middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c6safrl.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();


    const allToysCollection = client.db("toymarketplace").collection("cars");

    // All Car Data Fetch
    app.get("/cars", async (req, res) => {
        const cursor = allToysCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    });
    app.get("/cars/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await allToysCollection.findOne(query);
        res.send(result);
    });

    app.post('/cars', async (req, res) => {
        const booking = req.body;
        console.log(booking);
        const result = await allToysCollection.insertOne(booking);
        res.send(result);
    });
    // // Send a ping to confirm a successful connection
    await client.db
    ("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("running on port ");
});

app.listen(port, () => {
    console.log(`server is on port ${port}`);
});
