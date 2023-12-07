"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { loginUsingFetch } from "@/app/lib/fetchUser";
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/app/context/AlertContext";
import AuthenticatedUsers from "../AuthenticatedUsers";
import { useAuthenticateContext } from "@/app/context/AuthenticateContext";

function Page() {
  const { setUser } = useAuthenticateContext();
  const router = useRouter();
  const { showAlert } = useAlertContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleOnInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnLoginFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginButton = document.getElementById("loginButton");
    loginButton.disabled = true;
    loginUsingFetch(userData)
      .then((response) => {
        showAlert(
          response.success ? "success" : "danger",
          response.message,
          "top-5"
        );
        if (response.success) {
          const newUserData = {
            username: response.username,
            isAuthenticated: true,
            authToken: response.authToken,
            loginExpiry: Date.now() + 24 * 60 * 60 * 1000,
          };
          localStorage.setItem("user", JSON.stringify(newUserData));
          setUser(newUserData);
          router.replace("/");
        }
      })
      .catch((error) => showAlert("danger", error.message, "top-5"))
      .finally(() => {
        loginButton.disabled = false;
        setLoading(false);
      });
  };

  const handleOnContinueWithGoogle = (e) => {
    e.preventDefault();
    showAlert("warning", "This option is not available yet!", "top-5");
  };

  useEffect(() => {
    document.title = "Login";
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        className={`max-w-xl flex flex-col justify-center text-gray-50 items-center rounded `}
        onSubmit={handleOnLoginFormSubmit}
      >
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
        <Link
          href="/auth/forgotPassword"
          className=" mt-5  ml-2 font-bold text-sm text-blue-800 text-center hover:underline"
        >
          Forgot Password?
        </Link>
        <div className="my-3 d-flex justify-content-center">
          <button
            id="loginButton"
            type="submit"
            className="rounded flex items-center justify-center bg-blue-700 hover:bg-blue-800 active:opacity-80 w-60 py-2 h-10"
          >
            {loading ? <span className="pending ml-2"></span> : "Login"}
          </button>
        </div>
      </form>
      <p className="my-2 text-gray-600 text-center">Or</p>
      <form className="text-gray-50" onSubmit={handleOnContinueWithGoogle}>
        <div className="my-2">
          <button
            id="loginWithGoogle"
            className="bg-gray-700 rounded w-60 py-2 flex flex-row items-center  justify-center hover:bg-gray-800 active:opacity-90"
          >
            <i className="fa-brands fa-google mx-2 text-lg" />
            <span>Continue with Google</span>
          </button>
        </div>
      </form>
      <div className=" mt-5">
        <p className="text-sm inline-block">Don't have an account?</p>
        <Link
          href="/auth/signup"
          className=" ml-2 font-bold text-sm text-blue-800 text-center hover:underline"
        >
          Signup here
        </Link>
      </div>
    </div>
  );
}

export default AuthenticatedUsers(Page, "600px");
