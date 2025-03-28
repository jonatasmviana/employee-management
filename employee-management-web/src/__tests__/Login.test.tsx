import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/infra/services/Auth/AuthService";
import Login from "@/app/login/page";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/infra/services/Auth/AuthService", () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    login: jest.fn(),
  })),
}));

describe("Login Component", () => {
  let mockRouter;
  let mockLogin: jest.Mock;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    mockLogin = jest.fn();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (AuthService as jest.Mock).mockImplementation(() => ({ login: mockLogin }));
  });

  it("should render the login form", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("admin@admin.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin123")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should call login service and redirect on success", async () => {
    mockLogin.mockResolvedValue({ id: 1, token: "mockToken" });
    render(<Login />);

    await userEvent.type(screen.getByPlaceholderText("admin@admin.com"), "admin@admin.com");
    await userEvent.type(screen.getByPlaceholderText("admin123"), "admin123");
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({
      email: "admin@admin.com",
      password: "admin123",
    }));

    expect(localStorage.getItem("id")).toBe("1");
    expect(localStorage.getItem("token")).toBe("mockToken");
    expect(mockRouter.push).toHaveBeenCalledWith("/users");
  });

  it("should show error message on login failure", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));
    render(<Login />);

    await userEvent.type(screen.getByPlaceholderText("admin@admin.com"), "admin@admin.com");
    await userEvent.type(screen.getByPlaceholderText("admin123"), "wrongpassword");
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
  });
});
