import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const RegisterView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'citizen',
    issue_type_id: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const submissionData = { ...formData };
  
    // If role is 'worker', validate and parse issue_type_id
    if (submissionData.role === 'worker') {
      if (!submissionData.issue_type_id) {
        setMessage('Issue Type ID is required for workers');
        return;
      }
      submissionData.issue_type_id = parseInt(submissionData.issue_type_id);
  
      if (isNaN(submissionData.issue_type_id)) {
        setMessage('Issue Type ID must be a valid number');
        return;
      }
    } else {
      // Remove issue_type_id if not a worker
      delete submissionData.issue_type_id;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/register', submissionData);
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };
  

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Register New User</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Name</Form.Label>
            <Form.Control name="name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Email</Form.Label>
            <Form.Control name="email" type="email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Phone</Form.Label>
            <Form.Control name="phone" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Address</Form.Label>
            <Form.Control name="address" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Role</Form.Label>
            <Form.Select name="role" onChange={handleChange}>
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
            </Form.Select>
          </Form.Group>
          {formData.role === 'worker' && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5 text-dark">Issue Type ID (for Worker)</Form.Label>
              <Form.Control name="issue_type_id" onChange={handleChange} required />
            </Form.Group>
          )}
          <div className="text-center">
            <Button type="submit" variant="primary">Register</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterView;
