import React, { useEffect, useState } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { ButtonWithHoverEffect } from "../../components";
import { Input } from "@material-tailwind/react";
import { Breadcrumbs } from "@material-tailwind/react";
import {
  base64ToImage,
  fileToBase64,
  putRequest,
  showNotification,
  useUserAuthContext,
} from "../../utils";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("html");
  const { currentUser, setCurrentUser } = useUserAuthContext();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUserInfo(currentUser);
    setProfileImageUrl(currentUser?.profilePicture);
  }, [currentUser]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName } = userInfo;

    if (!firstName || !lastName) {
      showNotification({
        icon: "error",
        title: "Form Validation Error",
        message: "First Name and Last Name are required",
      });
      return;
    }

    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("ProfilePicture", profileImage);

    const res = await putRequest({
      endpoint: "/user/update",
      data: formData,
    });

    console.log(res);

    if (res.ok) {
      showNotification({
        icon: "success",
        title: "Profile Updated",
        message: "Profile updated successfully",
      });

      setCurrentUser((prevInfo) => {
        return { ...prevInfo, ...userInfo, profilePicture: profileImageUrl };
      });

      setIsEditing(false);

      return;
    }

    showNotification({
      icon: "error",
      title: "Error",
      message: res.message || "Profile Update Error",
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const fileSize = file.size / (1024 * 1024);

    e.target.value = "";

    if (fileSize > 3) {
      showNotification({
        icon: "error",
        title: "Image Upload Error",
        message: "Image size should not exceed 3MB",
      });
      return;
    }

    const base64Str = await fileToBase64(file);

    setProfileImageUrl(base64Str);

    setProfileImage(file);
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const data = [
    {
      label: "Blogs",
      value: "Blogs",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    ,
    {
      label: "Change Password",
      value: "Change Password",
      to: "/change-password",
      desc: ``,
    },
  ];

  return (
    <section className="relative">
      {isEditing && (
        <>
          <Breadcrumbs>
            <a href="#" className="opacity-60">
              Profile Page
            </a>

            <a href="#" onClick={() => setIsEditing(false)}>
              {isEditing ? "Edit Profile" : "Profile Page"}
            </a>
          </Breadcrumbs>
        </>
      )}
      {!isEditing && (
        <div className="absolute w-full h-[140px] bg-blue-400"></div>
      )}
      <div
        className={`relative z-10 rounded-xl p-4 pl-10 ${
          !isEditing && "top-24"
        }`}
      >
        <div className="flex items-center gap-4 mb-8">
          <img
            src={base64ToImage(profileImageUrl)}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
          <div className="flex flex-col items-start">
            {!isEditing && (
              <>
                <h1 className="font-semibold text-2xl text-center">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h1>
                <p className="text-gray-600">{userInfo?.email}</p>
              </>
            )}
            {isEditing && (
              <label
                htmlFor="profile-image-upload"
                className="py-2 cursor-pointer"
              >
                {" "}
                <FaUpload className="text-blue-600 text-xl" />
              </label>
            )}
            {!isEditing && (
              <button
                className="bg-blue-500  text-white px-3 py-1 rounded mt-2"
                onClick={() => setIsEditing(true)}
              >
                Edit profile
              </button>
            )}
          </div>
        </div>
        {isEditing && (
          <>
            <form onSubmit={handleSubmit} className="text-center w-[30%] mt-7">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image-upload"
              />

              <Input
                label="First Name"
                type="text"
                value={userInfo?.firstName}
                onChange={handleChange}
                name="firstName"
                required
              />
              <br />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={userInfo?.lastName}
                onChange={handleChange}
                required
              />
              <br />
              <Input
                label="Email"
                type="email"
                value={userInfo?.email}
                onChange={(e) => handleChange(e)}
                readOnly
              />
              <br />
              <ButtonWithHoverEffect
                type="submit"
                className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save
              </ButtonWithHoverEffect>
            </form>
          </>
        )}
        {!isEditing && (
          <Tabs value={activeTab} className="w-[60%]">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-[50%]"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {data.map(({ label, value, to }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? "text-gray-900" : ""}
                >
                  {to ? <Link to={to}>{label}</Link> : label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
