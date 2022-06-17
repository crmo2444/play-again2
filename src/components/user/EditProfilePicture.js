import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditProfilePicture = ({id, userObject}) => {
  const [postImage, setPostImage] = useState({
        email: `${userObject.email}`,
        firstName: `${userObject.firstName}`,
        lastName: `${userObject.lastName}`,
        password: `${userObject.password}`,
        profilePicture: "",
        bio: `${userObject.bio}`
  })
  const [editProfile, setEdit] = useState(false)

  let navigate = useNavigate()

const url = `http://localhost:8088/users/${id}`;
const createImage = (newImage) => axios.put(url, newImage);

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    setEdit(false)
    refreshPage()
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, 
    email: `${userObject.email}`,  
    firstName: `${userObject.firstName}`,
    lastName: `${userObject.lastName}`,
    password: `${userObject.password}`,
    profilePicture: base64,
    bio: `${userObject.bio}` });
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div>
        {editProfile ? <>
        <form onSubmit={handleSubmit}>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        <button>Submit</button>
      </form>
        </> : <button onClick={() => setEdit(true)}>Edit Profile Picture</button> }
    </div>
  );
}