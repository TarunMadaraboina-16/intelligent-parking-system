const express = require('express');
const router = express.Router();
const { createGarage, getGarages } = require('../controllers/garageController');

router.post('/', createGarage);
router.get('/', getGarages);

module.exports = router;
