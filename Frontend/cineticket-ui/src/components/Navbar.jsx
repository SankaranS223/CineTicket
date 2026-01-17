import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <div style={{padding:15,background:"#fff"}}>
      <Link to="/">User</Link> |{" "}
      <Link to="/admin">Admin</Link> |{" "}
      <Link to="/login">Login</Link>
    </div>
  );
}
