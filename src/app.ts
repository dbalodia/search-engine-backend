import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";

import * as TagsController from "./controllers/tags";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = "mongodb://localhost:27017/myapp";
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 9000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/**
 * Primary app routes.
 */
app.post("/tags/create", TagsController.createTags);
app.get("/tags/search", TagsController.getTags);

export default app;
