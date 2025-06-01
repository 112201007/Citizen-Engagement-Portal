import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Form, Button } from 'react-bootstrap';

const AdminView = () => {
  const { adminId } = useParams();
  const departmentId = adminId; // assume adminId equals issue_type_id

  const [issues, setIssues] = useState([]);
  // const [workers, setWorkers] = useState([]);

  const [assignedIssues, setAssignedIssues] = useState([]);
  const [unassignedIssues, setUnassignedIssues] = useState([]);
  const [workers, setWorkers] = useState([]);

  // // Fetch all issues (assigned + unassigned)
  const fetchIssue = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/admin/all-issues');
      setAssignedIssues(data.assigned);
      setUnassignedIssues(data.unassigned);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };


  // Fetch department-specific workers
  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/admin/workers', {
        params: { departmentId }
      });
      setWorkers(data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  // Manual assignment using correct endpoint and params
  const handleAssignWorker = async (issueId, workerId) => {
    try {
      await axios.post('http://localhost:5000/admin/assign-task', {
        issue_id: issueId,
        admin_id: adminId,
        worker_id: workerId
      });
      fetchIssues();
    } catch (error) {
      console.error('Error assigning worker:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // This shows: 'This worker is already assigned...'
      } else {
        alert('Something went wrong while assigning the worker.');
      }
    }
  };

  // Update issue status - assume a suitable endpoint exists
  const handleUpdateStatus = async (issueId, newStatus) => {
    try {
      console.log("Updating issue:", { departmentId, issueId, status: newStatus });

      const response = await axios.put('http://localhost:5000/admin/issues/update-status', {
        admin_id: parseInt(adminId), // make sure you send the admin_id if necessary===
        issueId: parseInt(issueId),
        status: newStatus

      });
      alert(response.data.message);     // Success feedback

      fetchIssues();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  // Fetch department-specific issues
  const fetchIssues = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/admin/issues', {
        params: { departmentId }
      });
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };


  useEffect(() => {
    fetchIssues();
    fetchWorkers();
  }, [departmentId]);

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>Admin Dashboard (Dept {departmentId})</Card.Title>


          <ListGroup>
            {issues.map((issue) => (
              <ListGroup.Item key={issue.issue_id}>
                <p>
                  <strong>Issue ID:</strong> {issue.issue_id}
                </p>
                <p>
                  <strong>Type ID:</strong> {issue.issue_type_id}
                </p>
                <p>
                  <strong>Description:</strong> {issue.description}
                </p>
                <p>
                  <strong>Location:</strong> {issue.location}
                </p>
                <p>
                  <strong>Assigned Worker:</strong> {issue.assigned_worker_name || 'Not Assigned'}
                </p>
                <p>
                  <strong>Status:</strong> {issue.status}
                </p>

                <Form.Select
                  className="mt-2"
                  value={issue.assigned_worker_id || ''}
                  onChange={(e) => handleAssignWorker(issue.issue_id, e.target.value)}
                >
                  <option value="">-- Select Worker --</option>
                  {workers.map((w) => (
                    <option key={w.worker_id} value={w.worker_id}>
                      {w.name} (ID: {w.worker_id})
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  className="mt-2"
                  value={issue.status}
                  onChange={(e) => handleUpdateStatus(issue.issue_id, e.target.value)}
                >
                  <option value="Reported">Reported</option>   
                  {/* // can add option to report then accordindly need to handle other things like worker .. */}
                  {/* <option value="In Progress">In Progress</option>//automaticaaly in progresss when worker  is assigned by admin */}
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
