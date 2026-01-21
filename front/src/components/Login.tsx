import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const setLogin = useAuthStore((state) => state.setLogin);

  const [formData, setFormData] = useState({
    alias: "",
    password: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN (GET)
        const res = await axios.get("http://localhost:4000/api/auth/login", {
          params: { alias: formData.alias, password: formData.password },
        });
        setLogin(res.data.token, res.data.user);
      } else {
        // REGISTRO (POST)
        await axios.post("http://localhost:4000/api/auth/register", formData);
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsLogin(true);
      }
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.error || "Ocurrió un problema"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 style={{ color: "#0866ff", marginBottom: "20px" }}>
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                className="auth-input"
                name="nombres"
                placeholder="Nombres"
                onChange={handleChange}
                required
              />
              <input
                className="auth-input"
                name="apellidos"
                placeholder="Apellidos"
                onChange={handleChange}
                required
              />
              <input
                className="auth-input"
                name="fechaNacimiento"
                type="date"
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            className="auth-input"
            name="alias"
            placeholder="Alias (Usuario)"
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "20px" }}
          >
            {isLogin ? "Entrar" : "Crear Cuenta"}
          </button>
        </form>

        <button
          className="auth-toggle-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Registro nuevo aquí" : "Iniciar sesión"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
