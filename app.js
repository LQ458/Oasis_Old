const express = require('express');
const mongoose = require('mongoose');
const uploadutils = require("./models/uploadfile");
const Post = require('./models/post');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const uploadmiddleware = uploadutils.middleware;
const imageCompressor = require('./models/compression');

dotenv.config();


const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.post('/upload',uploadmiddleware, async function (req, res) {
    const fileNumbers = req.files ? req.files.length : 0;
    const inputFiles = [];
    const outputFolderPath = path.join(process.cwd(), '/app/public/postspic/');
    const outputFolderPath1 = path.join(process.cwd(), '/app/public/uploads/');
    const post = new Post({
        title: req.body.title, 
        content: req.body.content, 
        group: req.body.group, 
        username: req.body.username, 
        postAnonymous: req.body.postAnonymous, 
        pictures: fileNumbers,
        pictureUrl: []
    });
    console.log(post);

    if (req.files && req.files.length >= 1) {
        req.files.forEach(function (file) {
          post.pictureUrl.push({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            size: file.size
          });
          inputFiles.push(outputFolderPath1+file.filename);
        });
      }
      imageCompressor.compressImages(inputFiles,outputFolderPath);

    await post.save().then(() => {
        console.log('Post saved')
    })
    console.log(post.pictures)
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
