import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Civic Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/citizen">
              Citizen View
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin View
            </Nav.Link>
            <Nav.Link as={Link} to="/worker">
              Worker View
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics">
              Issue Statistics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;