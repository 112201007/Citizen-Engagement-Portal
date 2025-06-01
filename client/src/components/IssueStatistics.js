import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

const Statistics = () => {
  const [departmentIssues, setDepartmentIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/statistics/department-issues');  // Adjust the URL if necessary
        setDepartmentIssues(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchDepartmentIssues();
  }, []);

  // Inline styles for centering content in each column
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0'
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'  // This centers the text in both <th> and <td>
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>Department Issues Statistics</Card.Title>
          {error && <p>{error}</p>}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>Department</th>
                <th style={thTdStyle}>Total Issues</th>
                <th style={thTdStyle}>Resolved Issues</th>
                <th style={thTdStyle}>Pending Issues</th>
              </tr>
            </thead>
            <tbody>
              {departmentIssues.map((issue, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{issue.department}</td>
                  <td style={thTdStyle}>{issue.total_issues}</td>
                  <td style={thTdStyle}>{issue.resolved_issues}</td>
                  <td style={thTdStyle}>{issue.pending_issues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Statistics;
