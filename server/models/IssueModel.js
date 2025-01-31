const pool = require('../config/db');

const IssueModel = {
  createIssue: async (userId, issueType, location) => {
    const query = `
      INSERT INTO Civic_Issues (User_ID, Issue_Type, Location)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [userId, issueType, location];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getAllIssues: async () => {
    const query = 'SELECT * FROM Civic_Issues;';
    const result = await pool.query(query);
    return result.rows;
  },

  updateIssueStatus: async (issueId, status) => {
    const query = `
      UPDATE Civic_Issues
      SET Status = $1
      WHERE Issue_ID = $2
      RETURNING *;
    `;
    const values = [status, issueId];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = IssueModel;