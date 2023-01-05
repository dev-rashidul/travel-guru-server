const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// Config Cors
app.use(cors());

// Get Data in JSON
app.use(express.json());

// Dot Env Config
require("dotenv").config();

// Connect MongoDB Database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@simple-node-mongo.gm35wt9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(uri);

// All the API'S

async function run() {
  try {
    // Create Collections
    const vacationCollection = client.db("Travel").collection("vacations");
    const blogCollection = client.db("Travel").collection("blogs");

    // Get API to Load All the Vacations
    app.get("/vacations", async (req, res) => {
      const query = {};
      const cursor = vacationCollection.find(query);
      const vacations = await cursor.toArray();
      res.send(vacations);
    });

    // Get API to Load All the Blogs
    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });
  } finally {
  }
}

run().catch((error) => console.error(error));

// Get API for Server Home Route
app.get("/", (req, res) => {
  res.send("This is Travel Guru Server");
});

// Port API
app.listen(port, () => {
  console.log(`Travel Guru Server is runnig on port : ${port}`);
});
