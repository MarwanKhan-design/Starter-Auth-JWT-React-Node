import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/auth";
import LoginForm from "../components/LoginForm";

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const jwtKey = localStorage.getItem("jwt_key");
  const navigate = useNavigate();

  const changeFormData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    const jwtKey = await loginApi(formData);
    localStorage.setItem("jwt_key", jwtKey);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (jwtKey !== null) {
      console.log("Already Logged In");
      setIsLoggedIn(true);
      return navigate("/");
    }
  }, [jwtKey]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          {isLoggedIn ? (
            <Alert>User is Already Logged In</Alert>
          ) : (
            <LoginForm login={login} changeFormData={changeFormData} />
          )}
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Login;
