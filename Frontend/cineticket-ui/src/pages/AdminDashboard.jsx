import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const load = () => {
    api.get("/movies").then(r => setMovies(r.data));
  };

  useEffect(() => {
    load();
  }, []);

  const add = () => {
    if (!title) return;
    api.post("/admin/movies", {
      title,
      genre: "Drama",
      duration: 120,
      rating: 4.5
    }).then(() => {
      setTitle("");
      load();
    });
  };

  const del = (id) => {
    api.delete(`/admin/movies/${id}`).then(load);
  };

  const startEdit = (movie) => {
    setEditId(movie.id);
    setEditTitle(movie.title);
  };

  const update = () => {
    api.put(`/admin/movies/${editId}`, {
      title: editTitle,
      genre: "Drama",
      duration: 120,
      rating: 4.5
    }).then(() => {
      setEditId(null);
      setEditTitle("");
      load();
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">Admin Movie Management</div>

      {/* ADD MOVIE */}
      <div className="admin-toolbar">
        <input
          placeholder="Enter movie title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={add}>Add Movie</button>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Movie Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m, index) => (
            <tr key={m.id}>
              <td>{index + 1}</td>

              <td>
                {editId === m.id ? (
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                ) : (
                  m.title
                )}
              </td>

              <td>
                {editId === m.id ? (
                  <>
                    <button onClick={update}>Save</button>
                    <button
                      className="danger"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(m)}>Update</button>
                    <button
                      className="admin-delete"
                      onClick={() => del(m.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
