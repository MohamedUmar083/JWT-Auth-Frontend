import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    await axios
      .post("http://localhost:8383/api/user/login-user", payload)
      .then((res) => {
        setToken(res.data.token);
        toast.success(res.data.Message);

        navigate("/home");
      })
      .catch((error) => {
        //console.log(error);
        toast.error(error.response.data.Message);
      });

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <br />
      <br />
      <div className="container login">
        <div className="row g-4 d-flex justify-content-center">
          <div className="col-6 ">
            <div className="card">
              <div className="card-body">
                <legend>Login</legend>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="email"
                    />
                    <label htmlFor="floatingInput">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <br />
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                  {"\u00A0"}
                  {"\u00A0"}
                  {"\u00A0"}
                  <Link
                    to="/forgetpassword"
                    className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  >
                    Forget Password ?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
