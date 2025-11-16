import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    // Optional query params: ?limit=100&group=groupName&user=someone
    const filter = {};
    if (req.query.group) filter.group = req.query.group;
    if (req.query.user) filter.$or = [{ sender: req.query.user }, { receiver: req.query.user }];

    const limit = parseInt(req.query.limit || '200', 10);
    const msgs = await Message.find(filter).sort({ timestamp: 1 }).limit(limit);
    res.json({ success: true, messages: msgs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
