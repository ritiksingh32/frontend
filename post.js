const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');

// In-memory queue
const queue = [];

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();

  const author = await User.findById(post.author).populate('followers');
  for (const follower of author.followers) {
    queue.push({
      receiver: follower._id,
      sender: author._id,
      message: `${author.name} posted something: "${post.content}"`
    });
  }

  res.send({ message: 'Post created and notifications queued.' });
});

// Worker to process queue every few seconds
setInterval(async () => {
  if (queue.length === 0) return;
  const notification = queue.shift();
  const newNotification = new Notification(notification);
  await newNotification.save();
}, 3000);

module.exports = router;
