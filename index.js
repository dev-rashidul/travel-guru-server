const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

// All the API'S

async function run() {
  try {
    // Create Collections
    const vacationCollection = client.db("Travel").collection("vacations");
    const discountCollection = client.db("Travel").collection("discounts");
    const blogCollection = client.db("Travel").collection("blogs");
    const usersCollection = client.db("Travel").collection("users");
    const bookingCollection = client.db("Travel").collection("bookings");

    // Get API to Load All the Discounts
    app.get("/discounts", async (req, res) => {
      const query = {};
      const cursor = discountCollection.find(query);
      const vacations = await cursor.toArray();
      res.send(vacations);
    });

    // Get Single Discounts
    app.get("/discount/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const vacation = await discountCollection.findOne(query);
      res.send(vacation);
    });

    // Get API to Load All the Vacations
    app.get("/vacations", async (req, res) => {
      const query = {};
      const cursor = vacationCollection.find(query);
      const vacations = await cursor.toArray();
      res.send(vacations);
    });

    // Get Single Vacation
    app.get("/vacation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const vacation = await vacationCollection.findOne(query);
      res.send(vacation);
    });

    // Get API to Load All the Blogs
    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });

    // Save User
    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });

    // Get All User API
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // Get Specific User
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      let query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });

    // Post Bookings API to add Review
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    // Get Specific User Bookings
    app.get("/dashboard/my-bookings", async (req, res) => {
      let query = {};
      if (req.query.booking_email) {
        query = {
          booking_email: req.query.booking_email,
        };
      }
      const cursor = bookingCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
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
