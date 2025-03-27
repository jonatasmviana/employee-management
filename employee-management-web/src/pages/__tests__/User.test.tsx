import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from '@jest/globals';
import User from "@/app/user/page";
import { useUser } from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("@/infra/services/User/UserService");
jest.mock("@/hooks/useUser", () => ({ useUser: jest.fn() }));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("User Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    (useUser as jest.Mock).mockReturnValue({ user: null, loading: true, error: null });

    render(<User />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error message if user loading fails", () => {
    (useUser as jest.Mock).mockReturnValue({ user: null, loading: false, error: "Error" });
    render(<User />);
    expect(screen.getByText("Error while loading user: Error"))
  });

  it("should prefill form when user data is available", () => {
    (useUser as jest.Mock).mockReturnValue({ user: { firstName: "John", lastName: "Doe", email: "john@example.com", role: 1 }, loading: false, error: null });
    render(<User />);
    expect(screen.getByDisplayValue("John"))
    expect(screen.getByDisplayValue("Doe"))
  });

  it("should navigate back on back button click", () => {
    render(<User />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockPush).toHaveBeenCalledWith("/users");
  });
});
