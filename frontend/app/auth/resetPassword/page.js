"use client";
import React, { useEffect, useState } from "react";
import { resetPasswordUsingFetch } from "@/app/lib/fetchUser";
import { useAlertContext } from "@/app/context/AlertContext";
import { useRouter } from "next/navigation";
import AuthenticatedUsers from "../AuthenticatedUsers";
const Page = ({ searchParams }) => {
  const router = useRouter();
  const { showAlert } = useAlertContext();
  const resetPasswordToken = searchParams.forgotPasswordToken;
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
    isEqual: false,
  });
  const [pending, setPending] = useState(false);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
      isEqual:
        name === "confirmPassword" && value === password.newPassword
          ? true
          : false,
    });
  };

  const handleOnSubmitResetPasswordForm = (e) => {
    e.preventDefault();
    const saveButton = document.getElementById("saveButton");
    saveButton.disabled = true;
    setPending(true);
    try {
      if (password.confirmPassword !== password.newPassword) {
        throw new Error("Password Does Not Match!");
      }

      resetPasswordUsingFetch({
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword,
        token: resetPasswordToken,
      })
        .then((response) => {
          const { success, message } = response;
          showAlert(success ? "success" : "danger", message);
          if (success) {
            router.replace("login");
          }
        })
        .catch((error) => showAlert("danger", error.message))
        .finally(() => {
          setPending(false);
          saveButton.disabled = false;
        });
    } catch (error) {
      showAlert("danger", error.message);
      setPending(false);
      saveButton.disabled = false;
    }
  };

  useEffect(() => {
    document.title = "Reset Password";
  }, [router]);

  return (
    <form
      onSubmit={handleOnSubmitResetPasswordForm}
      className="text-gray-600 flex flex-col justify-center items-center"
    >
      <div>
        <label htmlFor="loginUsernameInput" className="hidden">
          <input
            id="loginUsernameInput"
            type="text"
            name="username"
            placeholder="username"
            className="hidden"
            autoComplete="username"
          />
        </label>
      </div>
      <div className="my-3">
        <label htmlFor="newPassword">
          <input
            value={password.newPassword}
            minLength={8}
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="New Password"
            className="bg-gray-100 py-2 px-1 text-center w-60 border-2 border-transparent focus:border-blue-300 rounded "
            onChange={handleOnChangeInput}
            required={true}
            autoComplete="new-password"
          />
        </label>
      </div>
      <div className="my-3">
        <label htmlFor="confirmPassword">
          <input
            value={password.confirmPassword}
            minLength={8}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`bg-gray-100 py-2 px-1 text-center w-60 border-2 border-transparent  
            ${
              password.isEqual
                ? "focus:border-green-600"
                : "focus:border-red-400"
            } rounded`}
            placeholder="Confirm Password"
            onChange={handleOnChangeInput}
            required={true}
            autoComplete="new-password"
          />
        </label>
      </div>
      <div className="my-3 text-gray-50">
        <button
          id="saveButton"
          type="submit"
          className="bg-green-700 flex justify-center items-center w-60 h-10 py-3 px-10 font-bold hover:bg-green-800 active:opacity-80 rounded-md "
        >
          {pending ? <span className="pending"></span> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AuthenticatedUsers(Page, "400px");
