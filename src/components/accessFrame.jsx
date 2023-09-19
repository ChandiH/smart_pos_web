import React from "react";
import UserContext from "../context/UserContext";
import { checkAccess } from "../services/fakeAuthorizationService";

const AccessFrame = ({ accessLevel, onDenied, children, setUser }) => {
  return (
    <UserContext.Consumer>
      {(userContext) => {
        if (setUser) setUser(userContext);
        const { currentUser } = userContext;
        const access = checkAccess(currentUser.userRole_id, accessLevel);
        return !access ? onDenied() : children;
      }}
    </UserContext.Consumer>
  );
};

export default AccessFrame;
