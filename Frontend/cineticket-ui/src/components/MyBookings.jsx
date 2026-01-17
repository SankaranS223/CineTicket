import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyBookings({ refresh }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then(res => setBookings(res.data));
  }, [refresh]); // 🔥 re-fetch when booking happens

  return (
    <div className="user-section">
      <div className="user-section-title">My Bookings</div>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div className="user-card" key={b.id}>
          <div className="booking-row">
            <div>
              <strong>{b.movie.title}</strong>
              <div>Tickets: {b.tickets}</div>
            </div>
            <div className="booking-status">{b.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
