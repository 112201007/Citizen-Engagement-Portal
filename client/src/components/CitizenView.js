import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import citizenImage from '../assets/citizen.jpg';

const CitizenView = () => {
  const { citizenId } = useParams(); // Get citizenId from the route
  const [issues, setIssues] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  const [issueTypeId, setIssueTypeId] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  console.log("Loaded CitizenView for:", citizenId);

  // Fetch issues for the specific citizen when the component mounts
  useEffect(() => {
    fetchIssues();
    fetchIssueTypes();
  }, [citizenId]);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/issues/${citizenId}`);
      console.log("Fetched Issues:", response.data); // Debugging
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const fetchIssueTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/issues/issue-types');
      console.log("Fetched Issue Types:", response.data); // Debugging
      setIssueTypes(response.data);
    } catch (error) {
      console.error('Error fetching issue types:', error);
    }
  };

  const handleReportIssue = async () => {
    if (!issueTypeId || !description || !location) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/issues/report', {
        citizenId,
        issueTypeId, // Now sending the ID instead of the type name
        description,
        location,
      });

      console.log("Reported Issue:", response.data); // Debugging
      
      // Refresh the issues list after reporting
      fetchIssues();

      // Clear form fields
      setIssueTypeId('');
      setDescription('');
      setLocation('');
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
  };

  return (
    <Container className="my-5">
      <Card>
        <Card.Img variant="top" src={citizenImage} alt="Citizen View"   style={{ maxHeight: '320px', objectFit: 'cover' }}  />
        <Card.Body>
          <Card.Title>Citizen ID: {citizenId}</Card.Title>
          <Card.Title>Citizen View</Card.Title>

          {/* Issue Reporting Form */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Issue Type</Form.Label>
              <Form.Select 
                value={issueTypeId} 
                onChange={(e) => setIssueTypeId(e.target.value)}
              >
                <option value="">Select Issue Type</option>
                {issueTypes.map(type => (
                  <option key={type.type_id} value={type.type_id  }>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter description" 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Enter location" 
              />
            </Form.Group>

            <Button variant="primary" onClick={handleReportIssue}>Report Issue</Button>
          </Form>

          {/* Display Reported Issues */}
          <h3 className="mt-4">Your Reported Issues</h3>
          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            <ListGroup>
              {issues.map((issue) => (
                <ListGroup.Item key={issue.issue_id}> 
                  <strong>Type:</strong> {issue.issue_type} <br />
                  <strong> Description:</strong> {issue.description} <br />
                  <strong> Status:</strong> {issue.status} <br />
                  <strong> Assigned Worker:</strong> {issue.assigned_worker || "Not Assigned"}  <br />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CitizenView;