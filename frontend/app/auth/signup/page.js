"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signupUsingFetch } from "@/app/lib/fetchUser";
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/app/context/AlertContext";
import AuthenticatedUsers from "../AuthenticatedUsers";
import { useAuthenticateContext } from "@/app/context/AuthenticateContext";

function Page() {
  const router = useRouter();
  const { setUser } = useAuthenticateContext();
  const { showAlert } = useAlertContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnSignUpFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const signupButton = document.getElementById("signupButton");
    signupButton.disabled = true;
    signupUsingFetch(userData)
      .then((response) => {
        showAlert(
          response.success ? "success" : "danger",
          response.message,
          "top-5"
        );
        if (response.success) {
          router.replace("login");
        }
      })
      .catch((error) => showAlert("danger", error.message, "top-5"))
      .finally(() => {
        signupButton.disabled = false;
        setLoading(false);
      });
  };

  const handleOnSubmitGoogleForm = (e) => {
    e.preventDefault();
    showAlert("warning", "This option is not available yet!", "top-5");
  };

  useEffect(() => {
    document.title = "Signup";
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className={`max-w-xl flex flex-col justify-center text-gray-50 items-center rounded `}
        onSubmit={handleOnSignUpFormSubmit}
      >
        <div className="my-2 d-flex justify-content-center text-gray-600">
          <label htmlFor="loginUsernameInput" className="relative">
            <input
              id="loginUsernameInput"
              type="text"
              name="username"
              autoComplete="username"
              placeholder="username"
              className="bg-gray-100 py-2 px-1 text-center w-60 border-2 border-transparent focus:border-blue-300 rounded "
              onChange={handleOnInputChange}
              value={userData.username}
              required
            />
          </label>
        </div>
        <div className="my-2 d-flex justify-content-center text-gray-600">
          <label htmlFor="loginEmailInput" className="relative">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email address"
              id="loginEmailInput"
              className="bg-gray-100 py-2 px-1 text-center w-60 border-2 border-transparent focus:border-blue-300 rounded "
              onChange={handleOnInputChange}
              value={userData.email}
              required
            />
          </label>
        </div>
        <div className="my-2 d-flex justify-content-center align-items-center text-gray-600">
          <label
            htmlFor="loginPasswordInput"
            className="relative flex items-center"
          >
            <input
              id="loginPasswordInput"
              minLength={8}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className="bg-gray-100 py-2 px-1 w-60 text-center  border-2 border-transparent focus:border-blue-300 rounded  "
              onChange={handleOnInputChange}
              value={userData.password}
              required
            />
            <i
              id="show-password-eye"
              className={`fa-solid fa-${
                showPassword ? "eye" : "eye-slash"
              } text-gray-600 absolute right-2 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </label>
        </div>
        <div className="my-3 d-flex justify-content-center">
          <button
            id="signupButton"
            type="submit"
            className="rounded bg-blue-700 hover:bg-blue-800 flex justify-center items-center active:opacity-80 w-60 py-2"
          >
            {loading ? <span className="pending"></span> : "Signup"}
          </button>
        </div>
      </form>
      <p className="my-2 text-gray-600 text-center">Or</p>
      <form className="text-gray-50" onSubmit={handleOnSubmitGoogleForm}>
        <div className="my-2">
          <button
            id="signupWithGoogle"
            className="bg-gray-700 rounded w-60 py-2 flex flex-row items-center  justify-center hover:bg-gray-800 active:opacity-90"
          >
            <i className="fa-brands fa-google mx-2 text-lg" />
            <span> Continue with Google</span>
          </button>
        </div>
      </form>

      <div className=" mt-5">
        <p className="text-sm inline-block">Have an account?</p>
        <Link
          href="/auth/login"
          className="ml-2 font-bold text-sm text-blue-800 text-center hover:underline"
        >
          Login here
        </Link>
      </div>
    </div>
  );
}
export default AuthenticatedUsers(Page);
