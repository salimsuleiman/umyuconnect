import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSignup = (e) => {
    e.preventDefault();
    const SignUp = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/signup/",
        {
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }
      );
      response;
    };
    SignUp();
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>UmyukConnect Signup</h2>
      <h3 style={{ color: "#657786" }}>
        Sign up to see blogs and photos from your friends.
      </h3>
      <form onSubmit={(e) => HandleSignup(e)}>
        <div>
          <input
            type="text"
            onInput={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            type="text"
            onInput={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            onInput={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="email"
            onInput={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            onInput={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="btn">
            Sign Up
          </button>
        </div>
        <div className="form-site-footer">
          {/* <a href="" className="forgot-password-link">Forgot password ?</a> */}
          <span className="sign-up-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default SignUp;
