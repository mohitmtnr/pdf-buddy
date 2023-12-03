"use client";
import React, { memo, useEffect, useState } from "react";
import { fetchFileUsingFetch } from "../../lib/fetchPdf";
import { useAlertContext } from "@/app/context/AlertContext";
import Link from "next/link";
import { deleteFileUsingFetch } from "../../lib/fetchPdf";
import { useActivePageContext } from "@/app/context/ActivePageContext";
import Skeleton from "react-loading-skeleton";
import { useOptimizeFetch } from "@/app/context/OptimizeFetchCallContext";
import { useAuthenticateContext } from "@/app/context/AuthenticateContext";
import { useRouter } from "next/navigation";
//main component
const ListPdf = ({ setIsPdfFilesVisible }) => {
  const { user } = useAuthenticateContext();
  const router = useRouter();
  const { fetchData, setFetchData } = useOptimizeFetch();
  const { activeFile } = useActivePageContext();
  const { showAlert } = useAlertContext();
  const [pdfSource, setPdfSource] = useState({
    fetched: false,
    data: [],
  });

  const handleOnDeleteClick = (id) => {
    deleteFileUsingFetch(id, user.authToken)
      .then((response) => {
        const { success, message } = response;
        showAlert(success ? "success" : "danger", message);
        if (success) {
          // once pdf is deleted, on toggle fetch call will be made again
          setFetchData({ ...fetchData, isDataChanged: true });
          setIsPdfFilesVisible(false);

          if (activeFile !== null) {
            router.push(`/view`);
          }
        }
      })
      .catch((error) => showAlert("danger", error.message));
  };

  useEffect(() => {
    if (fetchData.isDataChanged)
      fetchFileUsingFetch(user.authToken)
        .then((res) => {
          setPdfSource({ fetched: true, data: res });
          setFetchData({ isDataChanged: false, cache: res });
        })
        .catch((error) => {
          showAlert("danger", error.message);
        });
    // optimizing fetch call and retrieving data from cache if data is not changed
    else setPdfSource({ fetched: true, data: fetchData.cache });
  }, []);

  return (
    <div className="m-5 w-60 h-80 bg-gray-800 overflow-x-hidden overflow-y-auto flex flex-shrink-0 flex-col  top-full items-center absolute mx-3  shadow-md rounded-md">
      <h3 className=" text-sm self-start ml-5 mb-3 pt-2 border-b-2 text-center border-gray-500">
        My PDFs
      </h3>
      {/* first check if the data is fetched and ready to use */}
      {pdfSource.data != undefined && pdfSource.data.length !== 0 ? (
        pdfSource.data.map((data, index) => (
          <div
            key={index}
            className={`group hover:bg-gray-900 active:opacity-80 w-full py-2 flex justify-between items-center ${
              index % 2 !== 0 ? "bg-gray-700" : ""
            } `}
          >
            <span
              className={`mx-2 w-2 aspect-square rounded-full ${
                activeFile === data.file_name ? "bg-green-400" : ""
              }`}
            ></span>
            <Link
              onClick={() => setIsPdfFilesVisible(false)}
              href={`/view?file=${data.file_name}`}
              className={`text-gray-50  text-xs  w-full text-start pr-5 py-2`}
            >
              <b>{index + 1}. </b>PDF {timeAgo(data.upload_time)}...
            </Link>
            <button
              type="button"
              title="Delete Pdf now"
              onClick={() => handleOnDeleteClick(data._id)}
              className="visible lg:invisible text-gray-50 text-lg text-center px-3 mr-2 rounded-md hover:bg-gray-800 group-hover:visible"
            >
              x
            </button>
          </div>
        ))
      ) : //  second check if the fetch call successfully returned and there is no data on the server
      pdfSource.fetched ? (
        <p className="text-gray-50 flex items-center justify-center text-xs py-2 w-full h-full rounded-md">
          No PDF files
        </p>
      ) : (
        // if the data is not loaded and fetch is not successfull wait for it using Skeleton experience
        <Skeleton
          height={320}
          width={240}
          baseColor="#1f2937"
          highlightColor="#374151"
        />
      )}
    </div>
  );
};

//function to show past time
function timeAgo(uploadTime) {
  const now = new Date();
  const timeDifference = now - new Date(uploadTime);
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 10) {
    return "just now";
  } else if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes + " minutes ago";
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours + " hours ago";
  } else {
    const days = Math.floor(seconds / 86400);
    return days + " days ago";
  }
}

export default memo(ListPdf);
