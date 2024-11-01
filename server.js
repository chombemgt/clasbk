// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const port = process.env.PORT || 5000; // Use environment variable or default port 5000

// // MongoDB connection string (replace with your Atlas details)
// const uri = "<connection Link>";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Database Connected'))
//   .catch(err => console.error(err));

// // Define your Express routes here (covered later)

// app.listen(port, () => console.log(`Server listening on port ${port}`));
// const User = require('./models/user');

// // Create a user (POST request)
// app.post('/users', async (req, res) => {
//   const newUser = new User(req.body);
//   try {
//     const savedUser = await newUser.save();
//     res.json(savedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// // Get all users (GET request)
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.json(user);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
// // Update a user by ID (PUT request with ID param)
// app.put('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// // Delete a user by ID (DELETE request with ID param)
// app.delete('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedUser = await User.findByIdAndDelete(id);
//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const bcrypt = require('bcryptjs');
   const User = require('./models/user');
   const app = express();
   app.use(express.json());
   app.use(cors());

   mongoose.connect('mongodb+srv://socialmgt3:Chombe%40123@cluster0.ljpd7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }).then(() => console.log('MongoDB connected'));

   


   app.post('/register', async (req, res) => {
     const { username, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({ username, password: hashedPassword });
     await user.save();
     res.json({ message: 'User registered successfully' });
   });
   const jwt = require('jsonwebtoken');

   app.post('/login', async (req, res) => {
     const { username, password } = req.body;
     const user = await User.findOne({ username });
     if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(400).json({ message: 'Invalid credentials' });
     }
     const token = jwt.sign({ id: user._id }, 'secretkey');
     res.json({ token });
   });

   app.listen(5000, () => console.log('Server running on port 5000'));