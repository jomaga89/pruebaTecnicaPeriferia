import React from "react";
import axios from "axios";
import { type Post } from "../types";
import { useAuthStore } from "../store/useAuthStore";

interface FeedProps {
  posts: Post[];
  onRefresh: () => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onRefresh }) => {
  const user = useAuthStore((state) => state.user);

  //Manejador de Likes
  const handleLike = async (postId: number) => {
    try {
      await axios.post(`http://localhost:4001/api/posts/${postId}/like`);
      onRefresh();
    } catch (err) {
      console.error("Error al dar like");
    }
  };

  //Manejador para borrar Posts
  const handleDelete = async (postId: number) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")
    ) {
      try {
        await axios.delete(`http://localhost:4001/api/posts/${postId}`);
        onRefresh();
      } catch (err) {
        alert("Error al eliminar el post");
      }
    }
  };

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="card" style={{ position: "relative" }}>
          {/* Solo mostramos el botón de eliminar si el post es del usuario logueado */}
          {user?.alias === post.autorAlias && (
            <button
              onClick={() => handleDelete(post.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                color: "#65676b",
                cursor: "pointer",
                fontSize: "18px",
              }}
              title="Eliminar post"
            >
              &times;
            </button>
          )}

          <div className="post-header">
            <div className="avatar-circle"></div>
            <div>
              <p className="post-author">@{post.autorAlias}</p>
              <p className="post-date">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            {post.mensaje}
          </p>

          <hr style={{ border: "0", borderTop: "1px solid #eee" }} />
          <button className="btn-like" onClick={() => handleLike(post.id)}>
            👍 {post.likes} Me gusta
          </button>
        </div>
      ))}
    </div>
  );
};

export default Feed;
