import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Form, Button } from 'react-bootstrap';

const AdminView = () => {
  const [issues, setIssues] = useState([]);
  const [workers, setWorkers] = useState([]); // List of available workers

  // Fetch all reported issues
  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/issues');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  // Fetch available workers
  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  // Assign worker to an issue
  const handleAssignWorker = async (issueId, workerId) => {
    try {
      await axios.put(`http://localhost:5000/issues/${issueId}/assign`, {
        assigned_worker: workerId,
      });

      setIssues(
        issues.map((issue) =>
          issue.issue_id === issueId ? { ...issue, assigned_worker: workerId } : issue
        )
      );
    } catch (error) {
      console.error('Error assigning worker:', error);
    }
  };

  // Update issue status
  const handleUpdateStatus = async (issueId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/issues/${issueId}/status`, { status: newStatus });

      setIssues(
        issues.map((issue) =>
          issue.issue_id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchWorkers();
  }, []);

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>Admin View</Card.Title>
          <h3>All Reported Issues</h3>
          <ListGroup>
            {issues.map((issue) => (
              <ListGroup.Item key={issue.issue_id}>
                <strong>Type:</strong> {issue.issue_type}, 
                <strong> Description:</strong> {issue.description}, 
                <strong> Location:</strong> {issue.location}, 
                <strong> Department:</strong> {issue.department}, 
                <strong> Assigned Worker:</strong> {issue.assigned_worker || "Not Assigned"}, 
                <strong> Status:</strong> {issue.status}

                {/* Assign Worker Dropdown */}
                <Form.Select
                  className="mt-2"
                  onChange={(e) => handleAssignWorker(issue.issue_id, e.target.value)}
                  value={issue.assigned_worker || ""}
                >
                  <option value="">Assign Worker</option>
                  {workers.map((worker) => (
                    <option key={worker.worker_id} value={worker.worker_id}>
                      {worker.name}
                    </option>
                  ))}
                </Form.Select>

                {/* Status Update Dropdown */}
                <Form.Select
                  className="mt-2"
                  value={issue.status}
                  onChange={(e) => handleUpdateStatus(issue.issue_id, e.target.value)}
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
