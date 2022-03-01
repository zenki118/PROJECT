import React from "react";
import axios from "axios";
import makeToast from "../Toaster";

const RegisterPage = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name"><b>Name</b></label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your name"
            ref={nameRef}
          />
        </div>
        <label htmlFor="email"><b>Email</b></label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          ref={emailRef}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter 6 characters for password"
          ref={passwordRef}
        />
      </div>
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;