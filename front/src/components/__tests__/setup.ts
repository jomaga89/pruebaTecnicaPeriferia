import { vi } from "vitest";

// Mock global para Zustand
vi.mock("../../store/useAuthStore", () => ({
  useAuthStore: (selector: (state: any) => any) => {
    const mockState = {
      user: null,
      token: null,
      setLogin: vi.fn(),
      logout: vi.fn(),
    };
    return selector(mockState);
  },
}));
