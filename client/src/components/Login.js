import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';

const Login = ({ setUser }) => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId || !role) {
      alert('Please enter your ID and select a role.');
      return;
    }
    setUser({ id: userId, role });                // Save user data in state
    navigate(`/${role.toLowerCase()}/${userId}`); // Redirect to role-specific view
  };

  return (
    <Container className="my-5">
      <Card className="p-4">
        <h2 className="text-center">Login</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your ID" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">-- Select Role --</option>
              <option value="Citizen">Citizen</option>
              <option value="Worker">Worker</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
