// pages/api/register.js
import mongoose from 'mongoose';
const p = 'mongodb+srv://jess:jess@cluster0.cgg9ypb.mongodb.net/?retryWrites=true&w=majority';
import User from "./user.js"

export default async function handler(req, res) {
    
    try {
        await mongoose.connect(p);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
  if (req.method === 'POST') {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username or password missing' });
      }
      const adminCode = req.body.adminCode
      let adminStatus = false
      if (adminCode === 'AiercroftLisa') { adminStatus = true }
      else { adminStatus = false }
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: adminStatus
      });
      await user.save();
      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}