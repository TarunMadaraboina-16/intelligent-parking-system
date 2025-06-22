const express = require('express');
const router = express.Router();
const { createAdminLog, getAdminLogs } = require('../controllers/adminLogController');

router.post('/', createAdminLog);
router.get('/', getAdminLogs);

module.exports = router;
