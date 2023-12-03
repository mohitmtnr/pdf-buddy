"use client";
import Image from "next/image";
import welcomeToPdfBuddyIllustration from "../../../public/illustrations/welcome-to-pdfbuddy.svg";
import whatWeOfferIllustration from "../../../public/illustrations/what-we-offer.svg";
import howItWorksIllustration from "../../../public/illustrations/how-it-works.svg";
import whyChooseUsIllustration from "../../../public/illustrations/why-choose-us.svg";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useActivePageContext } from "@/app/context/ActivePageContext";
const UploadForm = dynamic(() => import("../../ui/uploadForm"));

const intro = (
  <div className="intro flex w-11/12">
    <div className="my-5 md:my-10 flex flex-col items-start text-left">
      <h1 className=" text-gray-700 font-extrabold text-4xl">
        Welcome to PDF Page Extractor and Rearranger!
      </h1>
      <p className="pt-5 font-semibold text-gray-700">
        Are you tired of dealing with cumbersome PDF documents that contain
        pages you don't need or are disorganized? Our website offers a simple
        and efficient solution to extract and rearrange PDF pages to suit your
        specific needs.
      </p>
      <p className="pt-5 font-semibold text-gray-700">
        Say goodbye to cluttered and unwieldy PDFs - make them work for you!
      </p>
      <p className="pt-5 font-semibold text-gray-700">
        <b>
          Try it now and take control of your PDF documents like never before!
        </b>
      </p>
      <a
        href="#pdfUploadForm"
        type="button"
        className="bg-green-700 text-lg font-extrabold text-gray-50 px-10 py-3 mt-6 rounded-full hover:bg-green-600"
      >
        Edit Your First PDF
      </a>
    </div>
    <Image
      src={welcomeToPdfBuddyIllustration}
      height={500}
      width={500}
      alt="what we offer illustration image"
      className="hidden md:block md:w-1/2"
      loading="eager"
      priority={true}
    />
  </div>
);

const whatWeOffer = (
  <div className="whatWeOffer my-8 flex flex-row-reverse w-11/12">
    <div className="md:my-20 flex flex-col items-start text-left">
      <h1 className=" text-gray-700 font-extrabold text-3xl">What We Offer:</h1>
      <ul className="mt-5 font-semibold text-gray-700 md:list-disc">
        <li>
          <b>Extract Pages:</b> Have a lengthy PDF file with unnecessary pages?
          Our tool allows you to easily extract the pages you need, reducing the
          size and complexity of your document.
        </li>
        <li className="pt-5">
          <b>Rearrange with Ease:</b> Want to reorder your PDF pages to create a
          more logical flow? Our intuitive interface lets you rearrange pages
          effortlessly, customizing your document's structure to your liking.
        </li>
        <li className="pt-5">
          <b>Save and Download:</b> Once you're satisfied with your PDF's new
          layout, you can instantly save and download your freshly arranged
          document. It's that simple!
        </li>
      </ul>
    </div>
    <Image
      src={whatWeOfferIllustration}
      height={500}
      width={500}
      className="hidden md:block md:w-1/2"
      alt="what we offer illustration image"
      loading="eager"
      priority={true}
    />
  </div>
);

const howItWorks = (
  <div className="howItWorks my-8 flex w-11/12">
    <div className="md:my-20 flex flex-col items-start text-left">
      <h1 className=" text-gray-700 font-extrabold text-3xl">How It Works:</h1>
      <ul className="mt-5 font-semibold text-gray-700 md:list-disc">
        <li>
          <b>Upload Your PDF:</b> Start by uploading your PDF file to our
          platform. Our system will instantly analyze your document and display
          a visual representation of its pages.
        </li>

        <li className="pt-5">
          <b>Select and Extract:</b> Easily type the page numbers you want to
          extract in any order. Our user-friendly interface makes it a breeze to
          pinpoint the pages you need and arrange according to your input.
        </li>

        <li className="pt-5">
          <b>Arrange Pages:</b> You need not to additional step, just type the
          page numbers in the order you want and it is done. You have full
          control over your document's new sequence.
        </li>

        <li className="pt-5">
          <b>View and Download Your PDF:</b> Your pdf pages are now organized to
          perfection, hit the view or download button. Your customized document
          is ready to be used or shared.
        </li>
      </ul>
    </div>
    <Image
      src={howItWorksIllustration}
      height={500}
      width={500}
      className="hidden md:block md:w-1/2"
      alt="what we offer illustration image"
      loading="lazy"
    />
  </div>
);

const whyChoseUs = (
  <div className="whyChooseUs my-8 flex flex-row-reverse w-11/12">
    <div className="md:my-20 flex flex-col items-start text-left">
      <h1 className=" text-gray-700 font-extrabold text-3xl">Why Choose Us:</h1>
      <ul className="mt-5 font-semibold text-gray-700 md:list-disc">
        <li>
          <b>User-Friendly:</b> Our platform is designed for simplicity and ease
          of use. No technical expertise required; anyone can use it!
        </li>

        <li className="pt-5">
          <b>Fast and Reliable:</b> We provide a fast and efficient service to
          quickly organize and deliver your PDFs.
        </li>

        <li className="pt-5">
          <b>Secure:</b> Your data and documents are secure with us. We value
          your privacy and confidentiality.
        </li>

        <li className="pt-5">
          <b>No Installation Needed:</b> There's no need to install any software
          or plugins. Everything happens right in your browser.
        </li>
      </ul>
    </div>
    <Image
      src={whyChooseUsIllustration}
      height={500}
      width={500}
      className="hidden md:block md:w-1/2"
      alt="what we offer illustration image"
      loading="eager"
      priority={true}
    />
  </div>
);

//main component
const UploadPdf = () => {
  const { setActiveFile } = useActivePageContext();
  useEffect(() => {
    document.title = "PDF Buddy";
    setActiveFile(null);
  });
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {intro}
      {whatWeOffer}
      {howItWorks}
      {whyChoseUs}
      <Suspense fallback={<div className="text-gray-700">Loading...</div>}>
        <UploadForm />
      </Suspense>
    </div>
  );
};

export default UploadPdf;
