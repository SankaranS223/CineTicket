import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = () => {
    if (isRegister) {
      api.post("/auth/register", {
        username,
        password,
        role: "ROLE_USER"
      }).then(() => {
        setIsRegister(false);
        alert("Registration successful. Please login.");
      });
    } else {
      api.post("/auth/login", { username, password })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          const role = JSON.parse(atob(res.data.token.split(".")[1])).role;
          navigate(role === "ROLE_ADMIN" ? "/admin" : "/user");
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            alert("Invalid username or password");
          } else {
            alert("Something went wrong. Try again.");
          }
        });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">
          {isRegister ? "Register" : "Login"}
        </div>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={submit}>
          {isRegister ? "Register" : "Login"}
        </button>

        <div className="auth-switch">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsRegister(false)}>Login</span>
            </>
          ) : (
            <>
              New user?{" "}
              <span onClick={() => setIsRegister(true)}>Register</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
