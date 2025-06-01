import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const WorkerView = () => {
  const { workerId } = useParams(); // Get worker ID from URL
  const [workerDetails, setWorkerDetails] = useState(null);
  const [tasks, setTasks] = useState([]);

    // Fetch worker details (name, email)
    const fetchWorkerDetails = () => {
      fetch(`http://localhost:5000/worker/${workerId}/details`)
        .then((res) => res.json())
        .then((data) => setWorkerDetails(data))
        .catch((err) => console.error('Error fetching worker details:', err));
    };
  const fetchTasks = () => {
    fetch(`http://localhost:5000/worker/${workerId}/tasks`)
      .then((res) => res.json())
      // .then((data) => setTasks(data))
      .then((data) => {
        console.log("data fetched: ",data); // Check the structure of data
        setTasks(Array.isArray(data) ? data : []); 
      })
      .catch((err) => console.error('Error fetching tasks:', err));
  };


  // Fetch tasks when component mounts
  useEffect(() => {
    fetchWorkerDetails();
    fetchTasks();
  }, [workerId]);
        
  // Update task status and refetch tasks
  const handleUpdateStatus = (issueId, newStatus) => {
    if (!issueId) {
        console.error("Error: issueId is undefined");
        return;
     }
      
     fetch(`http://localhost:5000/worker/${workerId}/issues/${issueId}/update-status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.issue_id === issueId ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((error) => console.error('Error updating status:', error));
  };
  if (!workerDetails) {
    return <p>Loading worker details...</p>;
  }
  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>Worker : {workerDetails.email}</Card.Title>
          <h3>Your Assigned Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.issue_id}>
                  <strong>Issue Type:</strong> {task.type_name} <br />
                  <strong>Location:</strong> {task.location} <br />
                  <strong>Description:</strong> {task.description} <br />
                  <strong>Status:</strong> {task.status} <br />
                <Form.Select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task.issue_id, e.target.value)}
                >
                  {/* <option value="Assigned">Assigned</option> */}
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </ListGroup.Item>
            ))}
          </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorkerView;
