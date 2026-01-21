import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const fechaNac = Intl.DateTimeFormat("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(user?.fechaNacimiento));

  if (!user) return null;

  return (
    <div className="card" style={{ textAlign: "center", marginBottom: "20px" }}>
      <div
        className="avatar-circle"
        style={{
          width: "80px",
          height: "80px",
          margin: "0 auto 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0866ff",
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        {user.nombres?.charAt(0).toUpperCase()}
      </div>
      <h2 style={{ margin: "5px 0" }}>
        {user.nombres} {user.apellidos}
      </h2>
      <p style={{ color: "#65676b", margin: 0 }}>@{user.alias}</p>
      <div
        style={{
          marginTop: "15px",
          fontSize: "14px",
          color: "#65676b",
          borderTop: "1px solid #eee",
          paddingTop: "10px",
        }}
      >
        <span>Fecha de nacimiento: {fechaNac}</span>
      </div>
    </div>
  );
};

export default Profile;
