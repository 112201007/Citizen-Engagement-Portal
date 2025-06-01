import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>Civic Management System</p>
            <p>Contact: info@civicmanagement.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;