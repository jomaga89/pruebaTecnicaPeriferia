import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "./store/useAuthStore";
import Login from "./components/Login";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import { Post } from "./types";
import Profile from "./components/Profile";

function App() {
  const token = useAuthStore((state) => state.token);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error cargando posts", err);
    }
  };

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  if (!token) return <Login />;

  return (
    <div style={{ backgroundColor: "#213046", minHeight: "100vh" }}>
      <nav className="navbar">
        <h1>Periferia Social</h1>
        <button
          onClick={() => useAuthStore.getState().logout()}
          className="btn-like"
          style={{ color: "#0866ff" }}
        >
          Cerrar Sesión
        </button>
      </nav>
      <div className="app-container">
        <Profile />
        <CreatePost onPostCreated={fetchPosts} />
        <div style={{ marginTop: "20px" }}>
          <Feed posts={posts} onRefresh={fetchPosts} />
        </div>
      </div>
    </div>
  );
}

export default App;
