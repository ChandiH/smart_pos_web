import React from "react";
import UserContext from "../context/UserContext";
import { accessList } from "../services/authorizationService";
import toast from "react-hot-toast";

const AccessFrame = ({ accessLevel, onDenied, children }) => {
  const checkAccess = (user_access, accessLevel) => {
    console.log(user_access, accessLevel, accessList);
    const access = accessList().find((item) => item.access_name == accessLevel);
    return user_access.includes(access.access_type_id);
  };

  const onAccessDenied = () => {
    console.log("Access Denied");
    onDenied();
    toast("Access Denied", {
      position: "top-center",
      style: {
        padding: "16px",
        backgroundColor: "red",
        fontSize: "30px",
      },
    });
  };

  return (
    <UserContext.Consumer>
      {(userContext) => {
        const { currentUser } = userContext;
        const access = checkAccess(currentUser.user_access, accessLevel);
        return !access ? onAccessDenied() : children;
      }}
    </UserContext.Consumer>
  );
};

export default AccessFrame;
