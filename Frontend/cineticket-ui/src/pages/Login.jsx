import {useState} from "react";
import api from "../api/axios";

export default function Login(){
  const [u,setU]=useState("");
  const [p,setP]=useState("");

  const login=()=>{
    api.post("/auth/login",{username:u,password:p})
      .then(r=>{
        localStorage.setItem("token",r.data.token);
        alert("Login Success");
      });
  };

  return (
    <div className="card">
      <input placeholder="Username" onChange={e=>setU(e.target.value)}/>
      <input placeholder="Password" type="password" onChange={e=>setP(e.target.value)}/>
      <button onClick={login}>Login</button>
    </div>
  );
}
