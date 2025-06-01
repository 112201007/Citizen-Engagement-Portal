import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !role) {
      alert('Please enter your email and select a role.');
      return;
    }

    try {
      let endpoint = '';
      let vid = '';
      switch (role) {
        case 'Citizen':
          endpoint = 'http://localhost:5000/api/get-citizen-id';
          vid = 'citizen_id';
          break;
        case 'Worker':
          endpoint = 'http://localhost:5000/worker/get-worker-id';
          vid = 'worker_id';
          break;
        case 'Admin':
          endpoint = 'http://localhost:5000/admin/get-admin-id';
          vid = 'admin_id';
          break;
        default:
          alert('Invalid role selected');
          return;
      }

      const response = await axios.post(endpoint, { email });
      console.log(response)
      const userId = response.data[vid];
      if (response.data && userId) {
        
        setUser({ id: userId, role });

        // ✅ Navigate to role-based dashboard
        navigate(`/${role.toLowerCase()}/${userId}`);
      } else {
        setError("Invalid login details.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Login failed.");
      console.error("Login Error:", error);
    }
  };

  return (
    <Container className="my-5">
      <Card className="p-4">
        <h2 className="text-center">Login</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>
        
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Phone Number</Form.Label>
            <Form.Control 
              type="tel" 
              placeholder="(Optional for now)" 
              disabled
            />
          </Form.Group>
        
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-dark">Select Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">-- Select Role --</option>
              <option value="Citizen">Citizen</option>
              <option value="Worker">Worker</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>Login</Button>

          {error && <div className="text-danger mt-3">{error}</div>}
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
