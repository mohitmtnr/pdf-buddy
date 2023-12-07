"use client";
import { useAlertContext } from "@/app/context/AlertContext";
import { forgotPasswordResetUsingFetch } from "@/app/lib/fetchUser";
import AuthenticatedUsers from "../AuthenticatedUsers";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const { showAlert } = useAlertContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const handleOnInputChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOnSubmitForgotPasswordForm = (e) => {
    e.preventDefault();
    const sendEmailButton = document.getElementById("sendEmailButton");
    sendEmailButton.disabled = true;
    setPending(true);
    forgotPasswordResetUsingFetch(email)
      .then((response) => {
        const { success, message } = response;
        showAlert(success ? "success" : "danger", message, "top-5");
        if (success) {
          router.replace("/auth/login");
        }
      })
      .catch((error) => showAlert("danger", error.message, "top-5"))
      .finally(() => {
        setPending(false);
        sendEmailButton.disabled = false;
      });
  };

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  return (
    <form
      onSubmit={handleOnSubmitForgotPasswordForm}
      className="text-gray-50 flex flex-col justify-center items-center"
    >
      <div className="my-5 d-flex justify-content-center text-gray-600">
        <label htmlFor="receiverEmail">
          <input
            value={email}
            type="email"
            id="receiverEmail"
            name="receiverEmail"
            placeholder="email@gmail.com"
            className="bg-gray-100 py-2 px-1 text-center w-60 border-2 border-transparent focus:border-blue-300 rounded "
            onChange={handleOnInputChange}
            required={true}
          />
        </label>
      </div>
      <button
        id="sendEmailButton"
        type="submit"
        className="bg-green-700 flex justify-center items-center w-60 h-10 hover:bg-green-800 py-3 px-5 rounded-md active:opacity-80"
      >
        {pending ? (
          <span className="pending"></span>
        ) : (
          "Send Reset Password Link"
        )}
      </button>
    </form>
  );
};

export default AuthenticatedUsers(Page, "400px");
