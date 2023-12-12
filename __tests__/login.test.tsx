import { screen } from "@testing-library/react";
import { render } from ".";
import Login from "@/app/auth/login/page";

describe("Login", () => {
  it("Render login page", () => {
    render(<Login />);

    const title = screen.getByText("Login");
    const username = screen.getByText("Username");
    const password = screen.getByText("Password");

    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  
});
