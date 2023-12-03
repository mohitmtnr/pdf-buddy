"use client";
import React from "react";
import "./component.css";
import { useAlertContext } from "@/app/context/AlertContext";
const Alert = () => {
  // get the data of alert from alert context custom hook
  const { alert } = useAlertContext();

  // This component will always be there below navbar as it was placed the root layout of the app folder
  // The data visiblity depends on the alert state variable
  // If alert is not empty, it will show the alert else no content will be visible regardless the component is below navbar always

  return (
    alert && (
      <span
        className={` bg-${
          alert.type || "gray-400"
        } animate-shake py-3 px-5 rounded-md right-2 fixed shadow-md top-20 -mt-2 z-50`}
      >
        <p>{alert.message}</p>

        <span
          className={`decrease-width bg-${alert.type}-dark z-10 h-1 absolute bottom-0 left-0`}
        ></span>
      </span>
    )
  );
};

export default Alert;
