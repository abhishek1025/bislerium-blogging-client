import { Button, Input } from "@material-tailwind/react";
// import PropTypes from "prop-types";
import { useState } from "react";
import { Link, resolvePath, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = ({ authPageContainerRef, setLoader }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo((prevAuthInfo) => {
      return { ...prevAuthInfo, [name]: value };
    });
  };

  return (
    <form className="sign-in-form w-full lg:w-[80%]">
      <div>
        <h2 className="font-bold text-2xl">Sign in</h2>
        <p className="text-gray-600 text-sm mt-1">
          to Learn, Connect, and Thrive
        </p>
      </div>

      <div className="mt-8 space-y-4">
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
          autoComplete="off"
          required
        />
      </div>

      <div className="mt-2 mb-6 ">
        <Link to="/forgot-password">
          <span className="mt-3 text-gray-500 flex justify-end">
            forgotten password ?
          </span>
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className="py-2 text-center w-full bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign in
        </button>
      </div>

      <p>
        Don&apos;t have an account?{" "}
        <button
          className="mt-4 underline text-blue-600"
          type="button"
          onClick={() => {
            if (authPageContainerRef.current) {
              authPageContainerRef.current.classList.add("sign-up-mode");
            }
          }}
        >
          Register now
        </button>{" "}
      </p>
      <ToastContainer />
    </form>
  );
};

export default SignInForm;
