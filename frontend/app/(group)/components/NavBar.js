"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import AuthenticateUser from "./AuthenticateUser";
import { useOptimizeFetch } from "@/app/context/OptimizeFetchCallContext";
import { useAuthenticateContext } from "@/app/context/AuthenticateContext";
const ListPdf = dynamic(() => import("./ListPdf"));

const NavBar = () => {
  const { user, setUser } = useAuthenticateContext();
  const router = useRouter();
  const buttonRef = useRef();
  const [isPdfFilesVisible, setIsPdfFilesVisible] = useState(false);
  const { setFetchData } = useOptimizeFetch();

  const handleOnLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setFetchData({
      isDataChanged: true,
      cache: [],
    });
    router.push("/auth/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // User clicked outside the block, hide the pdf list
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsPdfFilesVisible(false);
      }
    }

    //click event on the document anywhere
    isPdfFilesVisible && document.addEventListener("click", handleClickOutside);

    //clean up
    return () => {
      isPdfFilesVisible &&
        document.removeEventListener("click", handleClickOutside);
    };
  }, [isPdfFilesVisible]);

  return (
    <nav className="bg-gray-800 py-3 sticky top-0 w-full">
      <ul className="text-gray-100 list-none flex justify-between items-center px-2">
        <li className="mx-2">
          <Link
            className="font-extrabold text-base sm:text-lg"
            href="/"
            rel="noopener noreferrer"
          >
            PDF Buddy
          </Link>
        </li>

        <ul className="flex items-center">
          <li
            className="group flex justify-end relative cursor-pointer mr-2"
            onMouseEnter={() => setIsPdfFilesVisible(false)}
          >
            <i className="fa-solid fa-circle-info pt-1  hover:text-gray-400" />
            <p className="invisible absolute -left-16 transition-all z-50 text-center p-3 text-xs w-64 rounded-md bg-gray-800 top-12 text-gray-50 shadow-md group-hover:visible">
              You can save upto 5 pdfs with maximum size of 5 MB each in your
              account.
            </p>
          </li>

          {/* list pdf drop down  */}
          <li className="pr-2 relative flex justify-center" ref={buttonRef}>
            <button
              onClick={() => setIsPdfFilesVisible(!isPdfFilesVisible)}
              className="hover:bg-gray-700 border-2 border-gray-700 py-2 w-24 rounded-md text-sm font-bold"
            >
              {isPdfFilesVisible ? "Hide Pdfs" : "View Pdfs"}
            </button>
            {isPdfFilesVisible && (
              <ListPdf setIsPdfFilesVisible={setIsPdfFilesVisible} />
            )}
          </li>

          <li
            className="group relative  text-center py-3 px-4 mx-2 flex justify-center items-center rounded-md  hover:bg-gray-700  font-bold "
            onMouseEnter={() => setIsPdfFilesVisible(false)}
          >
            <i className="fa-solid fa-user cursor-pointer" />
            <div className="user-info absolute duration-200 transition-all invisible group-hover:visible bg-gray-800 text-gray-50 w-60 rounded-md p-5 right-0 top-full my-5">
              <p className="w-full mb-5">Hello, {user.username}</p>
              <button
                className="w-full cursor-pointer  bg-red-700 py-2 rounded-md hover:bg-red-800"
                onClick={handleOnLogout}
              >
                logout
              </button>
            </div>
          </li>
        </ul>
      </ul>
    </nav>
  );
};

export default AuthenticateUser(NavBar, "10vh");
