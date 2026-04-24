import express from 'express';

const router = express.Router();

router.post('/create-checkout-session', (req, res) => {
  res.json({ message: 'Payment checkout session endpoint - TODO' });
});

export default router;
