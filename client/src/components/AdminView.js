import React, { useState } from 'react';
import { Container, Card, ListGroup, Form } from 'react-bootstrap';
import adminImage from '../assets/admin.jpg';

const AdminView = () => {
  const [issues, setIssues] = useState([
    { id: 1, type: 'Pothole', location: 'Main Street', status: 'Reported' },
    { id: 2, type: 'Garbage', location: 'Park Road', status: 'In Progress' },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );
  };

  return (
    <Container className="my-5">
      <Card>
        {/* <Card.Img variant="top" src={adminImage} alt="Admin View" /> */}
        <Card.Body>
          <Card.Title>Admin View</Card.Title>
          <h3>All Reported Issues</h3>
          <ListGroup>
            {issues.map((issue) => (
              <ListGroup.Item key={issue.id}>
                <strong>Type:</strong> {issue.type}, <strong>Location:</strong> {issue.location}, <strong>Status:</strong> {issue.status}
                <Form.Select
                  value={issue.status}
                  onChange={(e) => handleUpdateStatus(issue.id, e.target.value)}
                >
                  <option value="Reported">Reported</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </Form.Select>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminView;