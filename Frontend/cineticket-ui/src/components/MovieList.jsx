import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MovieList({ onBooked }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies").then(res => setMovies(res.data));
  }, []);

  const book = (movieId) => {
    api.post("/bookings", { movieId, tickets: 1 })
      .then(() => {
        alert("Booking successful");
        onBooked(); // 🔥 trigger refresh
      });
  };

  return (
    <div className="user-section">
      <div className="user-section-title">Available Movies</div>

      {movies.map(m => (
        <div className="user-card" key={m.id}>
          <div className="movie-row">
            <div>
              <div className="movie-title">{m.title}</div>
              <div className="movie-meta">
                {m.genre} | {m.duration} mins | ⭐ {m.rating}
              </div>
            </div>

            <button className="book-btn" onClick={() => book(m.id)}>
              Book
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
