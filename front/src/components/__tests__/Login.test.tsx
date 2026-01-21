import { render, screen, fireEvent } from "@testing-library/react";
import Auth from "../Login"; // Ajusta la ruta según tu archivo
import { describe, it, expect } from "vitest";

describe("Flujo de Autenticación", () => {
  it("debe permitir escribir en el campo de Alias", () => {
    render(<Auth />);
    const aliasInput = screen.getByPlaceholderText(
      /Alias/i,
    ) as HTMLInputElement;

    fireEvent.change(aliasInput, { target: { value: "tester" } });
    expect(aliasInput.value).toBe("tester");
  });

  it("debe cambiar entre Login y Registro al hacer click en el botón", () => {
    render(<Auth />);
    const toggleBtn = screen.getByText(/Registro nuevo aquí/i);

    fireEvent.click(toggleBtn);

    // Ahora debería aparecer el campo "Nombres" que solo está en Registro
    expect(screen.getByPlaceholderText(/Nombres/i)).toBeInTheDocument();
  });
});
