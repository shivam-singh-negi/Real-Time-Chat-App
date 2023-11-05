import React from 'react';
import { useContext } from 'react';
import { Alert, Button, Form, Row, Col, Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';

export const Register = () => {
 const {user,registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading}= useContext(AuthContext);
  return (
    <Container>
      <Form onSubmit={registerUser}>
        <Row style={{height:"100vh", justifyContent:"center",paddingTop:"10px"}}>
          <Col xs={12} lg={6}>
            <Stack gap={4}>
              <h2>Register</h2>

              <Form.Control type="text" placeholder="Name" onChange={(e)=>updateRegisterInfo({...registerInfo,name:e.target.value})} />
              <Form.Control type="email" placeholder="Email"onChange={(e)=>updateRegisterInfo({...registerInfo,email:e.target.value})} />
              <Form.Control type="password" placeholder="Password"onChange={(e)=>updateRegisterInfo({...registerInfo,password:e.target.value})} />
              <Button variant="primary" type="submit">{isRegisterLoading?"Creating your Account":"Register"}</Button>
             {
              registerError?.error&&  <Alert variant="danger">
                <p>{registerError?.message}</p></Alert>

             }
             
             
            </Stack>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
