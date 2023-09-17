import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import UploadImage from "../components/common/uploadImage";
import { uploadImage, uploadMultipleImage } from "../services/uploaderService";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  console.log("user details ", currentUser);
  const [images, setImages] = useState([]);

  const submit = async () => {
    const { data } = await uploadMultipleImage(images, currentUser.user_id);
    console.log(data);
  };

  return (
    <div className="container">
      <h1>./src/screen/userProfile.jsx</h1>
      <UploadImage
        fileTypes={["JPG", "PNG", "GIF"]}
        setFiles={(files) => setImages([...files])}
      />
      <button className="btn btn-primary" onClick={submit}>
        save Images
      </button>
    </div>
  );
};

export default UserProfile;
