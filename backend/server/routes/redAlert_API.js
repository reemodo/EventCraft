const express = require('express');
const router = express.Router();
const redCollManager = require('../collections-manager/redCollManager');

router.get('/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const redAlertData = await redCollManager.getRedAlertByCity(location);

    const response = redAlertData.severity === 'high' ? 'danger' : 'safe';

    res.json({ response });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
