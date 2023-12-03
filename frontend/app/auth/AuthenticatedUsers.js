"use client";
import { useAuthenticateContext } from "@/app/context/AuthenticateContext";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAlertContext } from "../context/AlertContext";

export default function AuthenticatedUsers(Component, height) {
  return function (props) {
    const { user, setUser } = useAuthenticateContext();
    const router = useRouter();
    useEffect(() => {
      //checking if user logged in 24 hours ago as per authToken validation
      if (user !== null && user.loginExpiry <= Date.now()) {
        setUser(null);
        localStorage.removeItem("user");
      }

      // redirecting the user to the home page if  logged in
      if (localStorage.getItem("user") !== null) {
        router.replace("/");
      }
    }, []);

    return !user ? (
      <Component {...props} />
    ) : (
      <Skeleton
        height={height}
        width="100vw"
        borderRadius={0}
        baseColor="#f9fafb"
        highlightColor="#e5e7eb"
      />
    );
  };
}
