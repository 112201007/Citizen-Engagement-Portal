const IssueModel = require('../models/IssueModel');

const IssueController = {
  reportIssue: async (req, res) => {
    try {
      const { userId, issueType, location } = req.body;
      const newIssue = await IssueModel.createIssue(userId, issueType, location);
      res.status(201).json(newIssue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllIssues: async (req, res) => {
    try {
      const issues = await IssueModel.getAllIssues();
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateIssueStatus: async (req, res) => {
    try {
      const { issueId, status } = req.body;
      const updatedIssue = await IssueModel.updateIssueStatus(issueId, status);
      res.status(200).json(updatedIssue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = IssueController;