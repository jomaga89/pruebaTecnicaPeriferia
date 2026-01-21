import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile from "../Profile";
import { useAuthStore } from "../../store/useAuthStore";

// Mock de Zustand para controlar los datos del usuario en el test
vi.mock("../../store/useAuthStore");

describe("Componente Profile", () => {
  it("debe mostrar el nombre y el alias del usuario correctamente", () => {
    // Simulamos que hay un usuario logueado
    (useAuthStore as any).mockReturnValue({
      user: {
        nombres: "Diego",
        apellidos: "Pérez",
        alias: "diego123",
        fechaNacimiento: "1990-01-01",
      },
    });

    render(<Profile />);

    // Verificaciones
    expect(screen.getByText(/Diego Pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/@diego123/i)).toBeInTheDocument();
  });

  it("no debe renderizar nada si no hay usuario", () => {
    (useAuthStore as any).mockReturnValue({ user: null });
    const { container } = render(<Profile />);
    expect(container.firstChild).toBeNull();
  });
});
