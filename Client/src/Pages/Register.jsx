import React from 'react';
import { Alert, Button, Form, Row, Col, Container, Stack } from 'react-bootstrap';

export const Register = () => {
  return (
    <Container>
      <Form>
        <Row style={{height:"100vh", justifyContent:"center",paddingTop:"10px"}}>
          <Col xs={12} lg={6}>
            <Stack gap={4}>
              <h2>Register</h2>
              <Form.Control type="text" placeholder="Name" />
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="password" placeholder="Password" />
              <Button variant="primary" type="submit">Register</Button>
              <Alert variant="danger"><p>AN error occured</p></Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
