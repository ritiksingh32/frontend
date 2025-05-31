const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

router.post('/:id/follow/:targetId', async (req, res) => {
  const { id, targetId } = req.params;
  const user = await User.findById(id);
  const target = await User.findById(targetId);
  user.following.push(target._id);
  target.followers.push(user._id);
  await user.save();
  await target.save();
  res.send({ message: 'Followed' });
});

module.exports = router;
// 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