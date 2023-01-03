import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../apis/auth";
import RegisterForm from "../components/RegisterForm";

const Register = ({ setIsLoggedIn, isLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const jwtKey = localStorage.getItem("jwt_key");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(jwtKey);
    if (jwtKey !== null) {
      console.log("Already Logged In");
      setIsLoggedIn(true);
      return navigate("/");
    }
  }, [jwtKey]);

  const changeFormData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const register = async (e) => {
    e.preventDefault();
    const { data, token } = await registerApi(formData);
    console.log(data, token);
    localStorage.setItem("jwt_key", jwtKey);
    setIsLoggedIn(true);
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          {isLoggedIn ? (
            <Alert>User Already Logged In</Alert>
          ) : (
            <RegisterForm changeFormData={changeFormData} register={register} />
          )}
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Register;
