import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

import Home from "@/app/page";
import { render } from "./index";

describe("Home", () => {
  it("Render 'Test Mantine'", () => {
    render(<Home />);
    const title = screen.getByText("Test Mantine");

    expect(title).toBeInTheDocument();
  });

  it("Render login button", () => {
    render(<Home />);

    const loginBtn = screen.getByText("Login");

    expect(loginBtn).toBeInTheDocument();
  });

  it("Render login page when click login button", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const loginBtn = screen.getByText("Login");

    await user.click(loginBtn);

    expect(mockRouter).toMatchObject({
      pathname: "/auth/login",
    });
  });
});
