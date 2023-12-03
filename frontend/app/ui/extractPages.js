import { useEffect, useState } from "react";
import { manipulatePdf } from "../lib/fetchPdf";
import { useAlertContext } from "../context/AlertContext";
import { useActivePageContext } from "../context/ActivePageContext";
import { useAuthenticateContext } from "../context/AuthenticateContext";

const ExtractPages = ({ file }) => {
  const { showAlert } = useAlertContext();
  const { user } = useAuthenticateContext();
  const { activeFile } = useActivePageContext();
  const [extractedPdfSrc, setExtractedPdfSrc] = useState("");
  const [pages, setPages] = useState("");
  const onChangePages = (e) => {
    setPages(e.target.value);
  };
  const handleOnSubmitExtractPages = (e) => {
    e.preventDefault();
    // separate pages with comma
    let pagesArray = pages.split(",");
    console.log(pagesArray);

    // fetch call
    manipulatePdf(pagesArray, file, user.authToken)
      .then(async (response) => {
        if (!response.ok) {
          const toJson = await response.json();
          throw new Error(toJson.message);
        }
        showAlert(
          "success",
          "Pdf successfully extracted and ready to download!"
        );
        return response.blob();
      })
      .then((pdfData) => {
        const dataUrl = URL.createObjectURL(pdfData);
        setExtractedPdfSrc(dataUrl);
      })
      .catch((error) => showAlert("danger", error.message));
  };

  useEffect(() => {
    setExtractedPdfSrc("");
  }, [activeFile]);

  return (
    <>
      <form
        id="pageExtractForm"
        className="container flex flex-row-reverse justify-center items-center mb-5 text-xs"
        onSubmit={handleOnSubmitExtractPages}
      >
        <label htmlFor="extractPages" className="w-48 sm:w-96">
          <input
            autoFocus={true}
            onChange={onChangePages}
            required={true}
            value={pages}
            type="text"
            id="extractPages"
            name="extractPages"
            title="Please enter page numbers in the order you would like them in new pdf, each page number should be comma seperated"
            placeholder="Page numbers"
            className="py-3 px-5 bg-gray-200 w-full h-10 rounded-tr-md rounded-br-md border-2 box-border border-l-0 focus:border-blue-300"
          />
        </label>
        <button className="bg-green-700 font-bold hover:bg-green-800 active:opacity-80 text-gray-50 px-2 py-3 w-24 rounded-tl-md rounded-bl-md">
          Extract Pages
        </button>
      </form>
      {/* show view and download link once the pdf is extracted */}
      {extractedPdfSrc && (
        <>
          <h1 className="text-gray-600 font-extrabold my-2">Extracted PDF</h1>
          <a
            id="downloadButton"
            href={extractedPdfSrc}
            target="_blank"
            className="bg-blue-600 text-gray-50 py-2 font-bold px-5 hover:bg-blue-700 active:opacity-80 rounded-md mb-5"
          >
            View
          </a>
          <a
            id="downloadButton"
            href={extractedPdfSrc}
            download="extracted.pdf"
            className="bg-red-600 text-gray-50 py-2 font-bold px-5 hover:bg-red-700 active:opacity-80 rounded-md mb-5"
          >
            Download
          </a>
        </>
      )}
    </>
  );
};

export default ExtractPages;
