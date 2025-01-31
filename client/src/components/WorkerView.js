import React, { useState } from 'react';
import { Container, Card, ListGroup, Form } from 'react-bootstrap';
import workerImage from '../assets/worker.jpg';

const WorkerView = () => {
  const [tasks, setTasks] = useState([
    { id: 1, issue: 'Pothole', location: 'Main Street', status: 'Assigned' },
    { id: 2, issue: 'Garbage', location: 'Park Road', status: 'In Progress' },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <Container className="my-5">
      <Card>
        {/* <Card.Img variant="top" src={workerImage} alt="Worker View" /> */}
        <Card.Body>
          <Card.Title>Worker View</Card.Title>
          <h3>Your Assigned Tasks</h3>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.id}>
                <strong>Issue:</strong> {task.issue}, <strong>Location:</strong> {task.location}, <strong>Status:</strong> {task.status}
                <Form.Select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                >
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorkerView;