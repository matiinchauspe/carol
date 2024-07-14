import express from 'express';

import data from '../utils/db.json' assert {type: 'json'};

const router = express.Router();

router.get('/messages', (req, res) => {
  res.json({
    messages: data.messages,
  });
});

export default router;

