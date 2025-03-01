import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import workerImage from '../assets/worker.jpg';

const WorkerView = () => {
  const { workerId } = useParams(); // Get worker ID from URL
  const [tasks, setTasks] = useState([]);
 
  const fetchTasks = () => {
    fetch(`http://localhost:5000/workers/${workerId}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched tasks:", data);  // Debugging: Check if API is returning data
        setTasks(data);
      })
      .catch((err) => console.error('Error fetching tasks:', err));
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, [workerId]);
        
  // Update task status and refetch tasks
  const handleUpdateStatus = (issueId, newStatus) => {
      if (!issueId) {
        console.error("Error: issueId is undefined");
        return;
     }
      
      fetch(`http://localhost:5000/workers/${issueId}/update-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
         .then((res) => res.json())
         .then(() => {
            setTasks(tasks.map((task) =>
            task.issue_id === issueId ? { ...task, status: newStatus } : task
          ));
        })
        .catch((error) => console.error('Error updating status:', error));
    };
      
  return (
    <Container className="my-5">
      <Card>
        {/* <Card.Img variant="top" src={workerImage} alt="Worker View" /> */}
        <Card.Body>
          <Card.Title>Worker Vieww</Card.Title>
          <h3>Your Assigned Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.id}>
                <strong>Issue:</strong> {task.issue_type}, 
                <strong>Location:</strong> {task.location}, 
                <strong>Status:</strong> {task.status}
                <Form.Select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task.issue_id, e.target.value)}
                >
                  <option value="Assigned">Assigned</option>
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






































// import React, { useState } from 'react';
// import { Container, Card, ListGroup, Form } from 'react-bootstrap';
// import workerImage from '../assets/worker.jpg';

// const WorkerView = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, issue: 'Pothole', location: 'Main Street', status: 'Assigned' },
//     { id: 2, issue: 'Garbage', location: 'Park Road', status: 'In Progress' },
//   ]);

//   const handleUpdateStatus = (id, newStatus) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, status: newStatus } : task
//       )
//     );
//   };

//   return (
//     <Container className="my-5">
//       <Card>
//         {/* <Card.Img variant="top" src={workerImage} alt="Worker View" /> */}
//         <Card.Body>
//           <Card.Title>Worker View</Card.Title>
//           <h3>Your Assigned Tasks</h3>
//           <ListGroup>
//             {tasks.map((task) => (
//               <ListGroup.Item key={task.id}>
//                 <strong>Issue:</strong> {task.issue}, <strong>Location:</strong> {task.location}, <strong>Status:</strong> {task.status}
//                 <Form.Select
//                   value={task.status}
//                   onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
//                 >
//                   <option value="Assigned">Assigned</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </Form.Select>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default WorkerView;