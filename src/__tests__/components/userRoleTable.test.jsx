import { render, screen, logRoles } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserRoleTable from "../../components/employee/userRoleTable";

describe("UserRoleTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    userRoles: [
      {
        id: 101,
        name: "Admin",
        description: "Admin",
      },
      {
        id: 102,
        name: "Manager",
        description: "Manager",
      },
    ],
  };

  test("should render a UserRoleTable properly", () => {
    render(<UserRoleTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("should select should call onSelect", async () => {
    user.setup();
    const onSelect = jest.fn();
    render(<UserRoleTable {...props} onSelect={onSelect} />);
    const button = screen.getAllByRole("button")[0];
    await user.click(button);
    expect(onSelect).toHaveBeenCalled();
  });
});
