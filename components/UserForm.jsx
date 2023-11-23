import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const UserForm = () => {
  return (
    <Container>
      <Navbar
        expand="lg"
        className="bg-purple text-white justify-content-center"
      >
        <Navbar.Brand href="#">The Royal Bank of Flatiron</Navbar.Brand>
      </Navbar>
    </Container>
  );
};

export default UserForm;
