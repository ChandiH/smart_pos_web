import { render, screen } from "@testing-library/react";
import AccessFrame from "./accessFrame";
import UserContext from "../context/UserContext";

/* // Sample UserRole
 *const userRole = {
 *  userRole_id: 104,
 *  access: ["report"],
 *};
 */

describe("AccessFrame", () => {
  const userContextProp = {
    value: {
      currentUser: {
        userRole_id: 104,
      },
      setCurrentUser: () => {},
    },
  };

  const frameProps = {
    onDenied: () => <label>Denied</label>,
    children: <label>Pass</label>,
  };

  test("when access granted", () => {
    render(
      <UserContext.Provider {...userContextProp}>
        <AccessFrame accessLevel={"report"} {...frameProps} />
      </UserContext.Provider>
    );

    const element = screen.getByText("Pass");
    expect(element).toBeInTheDocument();
  });

  test("when access denied", () => {
    render(
      <UserContext.Provider {...userContextProp}>
        <AccessFrame accessLevel={"customer"} {...frameProps} />
      </UserContext.Provider>
    );

    const element = screen.getByText("Denied");
    expect(element).toBeInTheDocument();
  });
});
