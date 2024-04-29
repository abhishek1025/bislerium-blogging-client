import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
// import { PropTypes } from "prop-types";

// import { postRequest, showNotification } from "@utils";

const SignUpForm = ({ authPageContainerRef, setLoader }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes separately
    if (type === "checkbox") {
      setUserInfo((prevUserInfo) => {
        return {
          ...prevUserInfo,
          role: checked ? value : "",
        };
      });
    } else {
      setUserInfo((prevUserInfo) => {
        return { ...prevUserInfo, [name]: value };
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form className="sign-up-form w-full lg:w-[80%]">
        {/* Sign up form title */}
        <div>
          <h2 className="font-bold text-2xl">Create your account</h2>
          <p className="text-gray-600 text-sm mt-1">
            Join our Family and Become part of us.
          </p>
        </div>

        <div className="my-3 space-y-4">
          <div className="space-y-4 flex items-center gap-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profile-image-upload"
            />
            <div className="w-24 h-24 border-2 object-cover border-gray-300 rounded-full overflow-hidden flex items-center justify-center text-center">
              {profileImage ? (
                <div>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div>Upload Image</div>
              )}
            </div>
            <label
              htmlFor="profile-image-upload"
              className="py-2 my-3 cursor-pointer"
            >
              {" "}
              <FaUpload className="text-blue-600 text-xl" />
            </label>
          </div>

          <div className="flex items-center gap-4">
            <Input
              type="text"
              label="First Name"
              name="firstName"
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type="email"
            label="Email"
            name="email"
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            required
            autoComplete="on"
          />
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            required
            autoComplete="on"
          />
        </div>

        <div className="">
          <button
            type="submit"
            className="py-2 text-center w-full bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-2">
          Already have an account?{" "}
          <button
            className="mt-3 underline text-blue-600"
            type="button"
            onClick={() => {
              if (authPageContainerRef.current) {
                authPageContainerRef.current.classList.remove("sign-up-mode");
              }
            }}
          >
            Sign in
          </button>{" "}
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
