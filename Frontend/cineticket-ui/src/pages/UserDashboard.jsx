import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MovieList from "../components/MovieList";
import MyBookings from "../components/MyBookings";
import "../styles/user.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="user-page">
      <div className="user-topbar">
        <div className="user-title">CineTicket</div>
        <button className="book-btn" onClick={logout}>Logout</button>
      </div>

      <MovieList onBooked={() => setRefresh(!refresh)} />
      <MyBookings refresh={refresh} />
    </div>
  );
}
