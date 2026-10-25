const express = require('express');
const router = express.Router();
const { getAllReports, createReport, updateReport, deleteReport } = require('../controllers/reportController');

router.get('/reports', getAllReports);
router.post('/reports', createReport);
router.put('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

module.exports = router;