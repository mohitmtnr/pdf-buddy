import { nunito } from "./ui/fonts";
import dynamic from "next/dynamic";
import { GlobalAlertProvider } from "./context/AlertContext";
import { GlobalActivePageProvider } from "./context/ActivePageContext";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import React, { Suspense } from "react";
import GlobalOptimizeFetchProvider from "./context/OptimizeFetchCallContext";
import GlobalAuthenticationProvider from "./context/AuthenticateContext";
const Alert = dynamic(() => import("./(group)/components/Alert"));

export const metadata = {
  title: "PDF Buddy",
  description:
    "Are you tired of saving long PDFs? Why did not you try us before? We offer free PDF customization, extraction and let you save 5 PDFs in your account. Try now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon/16x16.ico"
          sizes="16x16"
          type="image/x-icon"
          media="all"
          defer
        />
        <link
          rel="icon"
          href="/icon/48x48.ico"
          sizes="48x48"
          type="image/x-icon"
          media="all"
          defer
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          media="all"
          defer
        />
      </head>
      <body
        className={`${nunito.className} antialiased flex flex-col justify-center items-center w-full`}
      >
        <Suspense fallback={<div className="text-gray-900">loading...</div>}>
          <GlobalAuthenticationProvider>
            <GlobalAlertProvider>
              <GlobalActivePageProvider>
                <Alert />
                <GlobalOptimizeFetchProvider>
                  {children}
                </GlobalOptimizeFetchProvider>
              </GlobalActivePageProvider>
            </GlobalAlertProvider>
          </GlobalAuthenticationProvider>
        </Suspense>
      </body>
    </html>
  );
}
