import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  console.log("user details ", currentUser);

  return (
    <div className="container">
      <h1>./src/screen/userProfile.jsx</h1>
    </div>
  );
};

export default UserProfile;
