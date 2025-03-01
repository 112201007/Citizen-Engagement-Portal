import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import citizenImage from '../assets/citizen.jpg';

const CitizenView = () => {
  const [citizenId] = useState(1); // Replace with dynamic citizen ID
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    try {
<<<<<<< HEAD
     const response = await axios.get(`http://localhost:5000/issues/${citizenId}`);
=======
      const response = await axios.get(`http://localhost:5000/issues/${citizenId}`);
>>>>>>> 99127325b81f5a19e98f57852bf464667dd2e1f6
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleReportIssue = async () => {
    if (!issueType || !description || !location) {
      alert("Please fill in all fields");
      return;
    }

    try {
<<<<<<< HEAD
      const response = await axios.post('http://localhost:5000/report', { 
=======
      const response = await axios.post('http://localhost:5000/report', {
>>>>>>> 99127325b81f5a19e98f57852bf464667dd2e1f6
        citizenId,
        issueType,
        description,
        location,
      });

      setIssues([response.data, ...issues]);
      setIssueType('');
      setDescription('');
      setLocation('');
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <Container className="my-5">
      <Card>
        <Card.Img variant="top" src={citizenImage} alt="Citizen View" />
        <Card.Body>
          <Card.Title>Citizen View</Card.Title>
          <Form>
          <Form.Group className="mb-3">
  <Form.Label>Issue Type</Form.Label>
  <Form.Select
    value={issueType}
    onChange={(e) => setIssueType(e.target.value)}
  >
    <option value="">Select Issue Type</option>
    <option value="Pothole">Pothole</option>
    <option value="Garbage">Garbage</option>
    <option value="Street Light">Street Light</option>
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
<Button variant="primary" onClick={handleReportIssue}>
             Report Issue
            </Button>

          </Form>
          <h3 className="mt-4">Your Reported Issues</h3>
          <ListGroup>
  {issues.map((issue) => (
    <ListGroup.Item key={issue.issue_id}>
      <strong>Type:</strong> {issue.issue_type}, 
      <strong> Description:</strong> {issue.description}, 
      <strong> Location:</strong> {issue.location}, 
      <strong> Status:</strong> {issue.status}, 
      <strong> Assigned Worker:</strong> {issue.assigned_worker ? issue.assigned_worker : "Not Assigned"}, 
    </ListGroup.Item>
  ))}
</ListGroup>

          
        </Card.Body>
      </Card>
    </Container>
  );
};

<<<<<<< HEAD
export default CitizenView;
=======
export default CitizenView;








// import React, { useState } from 'react';
// import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
// import citizenImage from '../assets/citizen.jpg';

// const CitizenView = () => {
//   const [issueType, setIssueType] = useState('');
//   const [location, setLocation] = useState('');
//   const [issues, setIssues] = useState([]);

//   const handleReportIssue = () => {
//     const newIssue = {
//       id: issues.length + 1,
//       type: issueType,
//       location: location,
//       status: 'Reported',
//     };
//     setIssues([...issues, newIssue]);
//     setIssueType('');
//     setLocation('');
//   };

//   return (
//     <Container className="my-5">
//       <Card>
//         {/* <Card.Img variant="top" src={citizenImage} alt="Citizen View" /> */}
//         <Card.Body>
//           <Card.Title>Citizen View</Card.Title>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Issue Type</Form.Label>
//               <Form.Select
//                 value={issueType}
//                 onChange={(e) => setIssueType(e.target.value)}
//               >
//                 <option value="">Select Issue Type</option>
//                 <option value="Pothole">Pothole</option>
//                 <option value="Garbage">Garbage</option>
//                 <option value="Street Light">Street Light</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Location</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Enter location"
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={handleReportIssue}>
//               Report Issue
//             </Button>
//           </Form>
//           <h3 className="mt-4">Your Reported Issues</h3>
//           <ListGroup>
//             {issues.map((issue) => (
//               <ListGroup.Item key={issue.id}>
//                 <strong>Type:</strong> {issue.type}, <strong>Location:</strong> {issue.location}, <strong>Status:</strong> {issue.status}
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default CitizenView;





// =====Update the CitizenView component to report issues and fetch data from the backend:


>>>>>>> 99127325b81f5a19e98f57852bf464667dd2e1f6
