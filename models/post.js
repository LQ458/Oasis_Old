const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  group: {
    type: String,
  },
  username: {
    type: String,
  },
  postingtime: {
    type: Date,
    default: Date.now,
    get(value) {
      let date = new Date(value);
      let utc = date.getTime() + (date.getTimezoneOffset() * 60000); // Convert to milliseconds
      let newDate = new Date(utc + (3600000*8)); // Convert to UTC+8
      return newDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },
    immutable: true,
  },
  postAnonymous: {
    type: String,
  },
  pictures: {
    type: Number,
  },
  pictureUrl: [
    {
      filename: String,
      originalname: String,
      path: String,
      size: Number,
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports = Post;
