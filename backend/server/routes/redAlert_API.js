const express = require('express');
const router = express.Router();
const redCollManager = require('../collections-manager/redCollManager');

router.get('/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const redAlertData = await redCollManager.getRedAlertByLocation(location);

    res.json(redAlertData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
