import express from 'express';

const router = express.Router();

router.get('/messages', (req, res) => {
  res.json({
    message: 'messages'
  });
});

export default router;

