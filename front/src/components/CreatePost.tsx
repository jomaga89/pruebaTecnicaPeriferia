import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [mensaje, setMensaje] = useState("");
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    try {
      await axios.post("http://localhost:4001/api/posts", {
        mensaje,
        autorAlias: user?.alias,
      });

      setMensaje("");
      onPostCreated();
    } catch (err) {
      alert("Error al publicar");
    }
  };

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
        Crear publicación
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder={`Realiza tu publicación ${user?.nombres}`}
        />
        <button type="submit" className="btn-primary">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
