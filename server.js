require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const notificationRoutes = require('./routes/notification');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
