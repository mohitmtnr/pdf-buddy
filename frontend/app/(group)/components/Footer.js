"use client";
import React from "react";
import AuthenticateUser from "./AuthenticateUser";

const Footer = () => {
  // instead writing directly as html code, It is readable form of objects array which rely on same html code
  const socialMedia = [
    {
      id: "whatsApp",
      href: "https://api.whatsapp.com/send?phone=+918368710101",
      title: "What's app me",
      src: "fa-whatsapp",
      color: "hover:text-green-600",
    },
    {
      id: "linkedIn",
      href: "https://www.linkedin.com/in/mohit-498043204/",
      title: "Connect on Linkedin",
      src: "fa-linkedin",
      color: "hover:text-blue-600",
    },
    {
      id: "instagram",
      href: "https://www.instagram.com/mohit.206054/",
      title: "Follow on Instagram",
      src: "fa-instagram",
      color: "hover:text-fuchsia-600",
    },
    {
      id: "youtube",
      href: "https://www.youtube.com/channel/UCEtmbSY0l7OgL6dJxBP1TCA",
      title: "Subscribe on Youtube",
      src: "fa-youtube",
      color: "hover:text-red-600",
    },
  ];

  return (
    <footer className="w-full flex-col justify-center text-center bg-gray-100 text-gray-600 border-t-2 border-t-gray-100">
      <h1 className="p-10 text-2xl font-extrabold flex flex-col items-center">
        Join Us
        <span className="w-32 border-b-2 border-b-gray-200 block" />
      </h1>
      <div className="flex justify-center items-center p-5 pb-20">
        {/* displayed the contents of the array with the same html code */}
        {socialMedia &&
          socialMedia.map((icon) => (
            <a
              key={icon.id}
              href={icon.href}
              title={icon.title}
              rel="noopener noreferrer"
              target="_blank"
              className="mx-5 w-fit h-fit"
            >
              <i className={`fa-brands ${icon.src} text-3xl ${icon.color}`} />
            </a>
          ))}
      </div>
      <p className="text-sm text-gray-50 bg-gray-800  py-5">
        &copy; 2023 PDF Buddy, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default AuthenticateUser(Footer, "20vh");
