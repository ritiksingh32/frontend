const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const notifications = await Notification.find({ receiver: userId })
    .sort({ createdAt: -1 });
  res.send(notifications);
});

module.exports = router;
