"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useActivePageContext } from "@/app/context/ActivePageContext";
import AuthenticateUser from "../components/AuthenticateUser";
const ExtractPages = dynamic(() => import("@/app/ui/extractPages"));
const SRC_URL = process.env.NEXT_PUBLIC_SRC_URL;

const PdfViewer = ({ searchParams }) => {
  const { setActiveFile } = useActivePageContext();
  const fileName = searchParams.file;

  useEffect(() => {
    document.title = "Pdf Viewer";
    if (fileName !== undefined && fileName !== null) {
      setActiveFile(fileName);
    }
  }, [fileName]);

  return (
    <div className="flex flex-col items-center w-screen h-full my-10">
      {fileName ? (
        <>
          <ExtractPages file={fileName} />

          <h1 className="text-gray-600 font-extrabold my-2">Original PDF</h1>

          <iframe
            height={600}
            width={300}
            src={`${SRC_URL}/${fileName}`}
            className="md:w-3/4 lg:w-1/2 border-b-8 border-b-gray-700"
          />
        </>
      ) : (
        <div className="no-file w-screen flex justify-center items-center">
          No File Selected!
        </div>
      )}
      <Link
        href="/"
        className="mt-20 mb-10 bg-gray-600 text-gray-50 rounded-md px-10 py-3 hover:bg-gray-800 active:opacity-80"
      >
        <b>&lt;</b> Back To Home
      </Link>
    </div>
  );
};

export default AuthenticateUser(PdfViewer, "65vh");
