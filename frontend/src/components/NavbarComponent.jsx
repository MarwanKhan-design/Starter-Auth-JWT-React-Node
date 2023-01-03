import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = ({ isLoggedIn, setIsLoggedIn, routes }) => {
  const changeIsLoggedIn = () => {
    const key = localStorage.getItem("jwt_key");
    if (key !== null) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    changeIsLoggedIn();
  }, [localStorage.getItem("jwt_key"), isLoggedIn]);

  const routesMap = () => {
    if (!isLoggedIn) {
      return (
        routes &&
        routes.map((route) => {
          return (
            route.loginRoute && (
              <Nav.Link as={Link} to={route.path} key={route.id}>
                {route.name}
              </Nav.Link>
            )
          );
        })
      );
    } else {
      return (
        routes &&
        routes.map((route) => {
          return (
            !route.loginRoute && (
              <Nav.Link as={Link} to={route.path} key={route.id}>
                {route.name}
              </Nav.Link>
            )
          );
        })
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_key");
    setIsLoggedIn(false);
    // isLoggedIn;
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">{routesMap()}</Nav>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <>Logged In</>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
