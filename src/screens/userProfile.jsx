import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...currentUser });
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
  };


  const handleSave = () => {
    //saving logic
    setEditing(false);
  };

  return (
    <div className="container my-3">
      <h1 >User Profile</h1>
      <aside className = "col-lg-4">
        <div className="profile-rounded-4 mb-3 mt-3 d-flex justify-content-ceter">
          <label htmlFor="profilePictureInput">
          <img
              src={newProfilePicture ? URL.createObjectURL(newProfilePicture) : (editedUser.image ? editedUser.image : "https://placehold.co/400x400/png")}
              alt="Profile"
              style={{ width: "60%", aspectRatio: 1, margin: "auto", cursor: editing ? "pointer" : "default" }}
              className="rounded-4 fit"
            />
          </label>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePictureChange}
            disabled={!editing}
          />
        </div>
      </aside>
      <div className = "col-lg-8">
        <div className="row g-3">
          <div className="mb-3">
          <label className="form-label">Name:</label>
          {editing ? (
            <input
              type="text"
              className="form-control"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          ) : (
            <span style={{marginLeft: "10rem"}}>{editedUser.name}</span>
          )}
        </div>
        
        <div className="mb-3">
          <label className="form-label">User role:</label>
          
            <span style={{marginLeft: "10rem"}}>{editedUser.userRole}</span>

        </div>

        <div className="mb-3">
          <label className="form-label">Branch:</label>
          
            <span style={{marginLeft: "10rem"}}>{editedUser.branch}</span>
          
        </div>

        <div className="mb-3">
          <label className="form-label">Telephone Number:</label>
          {editing ? (
            <input
              type="text"
              className="form-control"
              name="telephoneNumber"
              value={editedUser.telephoneNumber}
              onChange={handleInputChange}
            />
          ) : (
            <span style={{marginLeft: "10rem"}}>{editedUser.telephoneNumber}</span>
          )}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Address:</label>
          {editing ? (
            <input
              type="text"
              className="form-control"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
            />
          ) : (
            <span style={{marginLeft: "10rem"}}>{editedUser.address}</span>
          )}
        </div>
        <div className="mb-3">
          <label>Username:</label>
          {editing ? (
            <input
              type="text"
              className="form-control"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
          ) : (
            <span style={{marginLeft: "10rem"}}>{editedUser.username}</span>
          )}
        </div>
        </div>
      </div>


      {editing && (
        <button className = "btn btn-primary"onClick={handleSave}>Save Changes</button>
      )}

      {!editing && (
        <button className = "btn btn-primary" onClick={() => setEditing(!editing)}>Edit Details</button>
      )}
    </div>
  );
};

export default UserProfile;
