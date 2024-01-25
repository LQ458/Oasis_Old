const express = require("express");
const mongoose = require("mongoose");
const uploadutils = require("./models/uploadfile");
const Post = require("./models/post");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const Like = require("./models/like");
const uploadmiddleware = uploadutils.middleware;
const imageCompressor = require("./models/compression");

dotenv.config();

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/upload", uploadmiddleware, async function (req, res) {
  const fileNumbers = req.files ? req.files.length : 0;
  const inputFiles = [];
  let postAnonymous = false;
  if (req.body.postAnonymous === "true"){ postAnonymous = true; }
  const outputFolderPath = path.join(process.cwd(), "/public/");
  const outputFolderPath1 = path.join(process.cwd(), "/app/public/uploads/");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    group: req.body.group,
    username: req.body.username,
    postAnonymous: postAnonymous,
    pictures: fileNumbers,
    pictureUrl: [],
  });

  if (req.files && req.files.length >= 1) {
    req.files.forEach(function (file) {
      post.pictureUrl.push({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
      });
      inputFiles.push(outputFolderPath1 + file.filename);
    });
  }
  imageCompressor.compressImages(inputFiles, outputFolderPath);

  await post.save().then(() => {
    Like.create({
      postId: post._id,
      username: req.body.username,
      forum: req.body.group,
      number: 0,
      postingtime: post.postingtime,
    });
  });

  console.log("Post saved");
  res.status(201).send("Post saved");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at Port ${process.env.PORT}`);
});
