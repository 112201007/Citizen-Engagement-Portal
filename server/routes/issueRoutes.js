const express = require('express');
const IssueController = require('../controllers/IssueController');

const router = express.Router();

router.post('/report', IssueController.reportIssue);
router.get('/all', IssueController.getAllIssues);
router.put('/update-status', IssueController.updateIssueStatus);

module.exports = router;