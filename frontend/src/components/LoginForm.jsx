import React from "react";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({ login, changeFormData }) => {
  const input = ({
    label,
    name,
    description,
    placeholder = `Type your ${label} Here`,
    type = "text",
    isRequired = true,
  }) => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={(e) => changeFormData(name, e.target.value)}
          required={isRequired}
        />
        <Form.Text className="text-muted">{description}</Form.Text>
      </Form.Group>
    );
  };
  return (
    <Form onSubmit={login}>
      {input({ label: "Email", name: "email", type: "email" })}
      {input({ label: "Password", name: "password", type: "password" })}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
