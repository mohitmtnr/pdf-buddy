import { useAlertContext } from "../context/AlertContext";
import React, { useRef, useState } from "react";
import { uploadFileUsingFetch } from "../lib/fetchPdf";
import { useRouter } from "next/navigation";
import { useOptimizeFetch } from "../context/OptimizeFetchCallContext";
import { useAuthenticateContext } from "../context/AuthenticateContext";

//form
const UploadForm = () => {
  const router = useRouter();
  const { user } = useAuthenticateContext();
  const { fetchData, setFetchData } = useOptimizeFetch();
  const { showAlert } = useAlertContext();
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    isSubmitted: false,
    isEmptyFileInput: true,
  });

  const handleOnChangeFileInput = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, file, isEmptyFileInput: file ? false : true });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setFormData({ ...formData, isSubmitted: true });
      const response = await uploadFileUsingFetch(
        formData.file,
        user.authToken
      );
      //check for response
      if (response.success) {
        showAlert("success", response.message);
        // optimizing fetch call as the new data is added so fetch call occur in list pdf
        setFetchData({ ...fetchData, isDataChanged: true });
        router.push(`/view?file=${response.file}`);
      } else {
        showAlert(
          "danger",
          response.message || "Something went wrong, please try again later!"
        );
      }

      setTimeout(() => {
        setFormData({ ...formData, isSubmitted: false });
      }, 2100);
    } catch (error) {
      showAlert("warning", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="pdfUploadForm"
      className="border-2 border-gray-200 shadow mt-10 mb-20 lg:w-96 lg:aspect-video flex flex-col items-center justify-evenly rounded-xl"
      onSubmit={handleFormSubmit}
    >
      <label className="block p-8 w-72" htmlFor="myPdf">
        <input
          disabled={formData.isSubmitted}
          onChange={handleOnChangeFileInput}
          id="myPdf"
          name="myPdf"
          type="file"
          accept="application/pdf"
          className={`block w-full file:cursor-pointer text-sm text-slate-500 
file:mr-4 file:py-2 file:px-4 lg:file:w-30 lg:file:py-3  lg:file:text-md  file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-gray-600 file:text-gray-200
${formData.isSubmitted ? "" : "hover:file:bg-gray-900"}
`}
        />
      </label>
      <button
        ref={uploadRef}
        disabled={formData.isSubmitted || formData.isEmptyFileInput}
        type="submit"
        value="Upload"
        className={`mb-8 cursor-pointer flex items-center justify-center h-10 w-60 text-sm font-semibold
 py-2 px-5 lg:w-60  lg:text-lg
rounded-full file:border-0
file:text-sm file:font-semibold
bg-gray-600 text-gray-200
${
  formData.isSubmitted || formData.isEmptyFileInput ? "" : "hover:bg-gray-900"
}`}
      >
        {loading ? <span className="pending ml-2"></span> : "Upload"}
      </button>
    </form>
  );
};

export default UploadForm;
