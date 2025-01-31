import React from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import statisticsImage from '../assets/statistics.jpg';

const IssueStatistics = () => {
  const issues = [
    { type: 'Pothole', count: 10, resolved: 7 },
    { type: 'Garbage', count: 5, resolved: 3 },
    { type: 'Street Light', count: 3, resolved: 2 },
  ];

  return (
    <Container className="my-5">
      <Card>
        {/* <Card.Img variant="top" src={statisticsImage} alt="Issue Statistics" /> */}
        <Card.Body>
          <Card.Title>Issue Statistics & Trends</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Issue Type</th>
                <th>Total Reported</th>
                <th>Resolved</th>
                <th>Resolution Rate</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={index}>
                  <td>{issue.type}</td>
                  <td>{issue.count}</td>
                  <td>{issue.resolved}</td>
                  <td>{((issue.resolved / issue.count) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default IssueStatistics;