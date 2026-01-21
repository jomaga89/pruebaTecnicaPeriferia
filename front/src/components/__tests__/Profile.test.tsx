import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Profile from "../Profile";
import { useAuthStore } from "../../store/useAuthStore";

// Mock de Zustand para controlar los datos del usuario en el test
vi.mock("../../store/useAuthStore");

describe("Componente Profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar el nombre y el alias del usuario correctamente", () => {
    // Crear un mock que se comporte como el selector de Zustand
    const mockStore = {
      user: {
        nombres: "Diego",
        apellidos: "Pérez",
        alias: "diego123",
        fechaNacimiento: "1990-01-01",
      },
    };

    (useAuthStore as any).mockImplementation((selector: any) => {
      return selector(mockStore);
    });

    render(<Profile />);

    // Verificaciones
    expect(screen.getByText(/Diego Pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/@diego123/i)).toBeInTheDocument();
  });

  it("no debe renderizar nada si no hay usuario", () => {
    // Mock sin usuario
    const mockStore = {
      user: null,
    };

    (useAuthStore as any).mockImplementation((selector: any) => {
      return selector(mockStore);
    });

    const { container } = render(<Profile />);
    expect(container.firstChild).toBeNull();
  });
});
