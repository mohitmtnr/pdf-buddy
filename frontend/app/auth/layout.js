import Image from "next/image";
import userProfileImage from "@/public/images/defaultProfile.jpg";

export const metadata = {
  title: "PDF Buddy Login Page",
  description: "Login to enter PDF Buddy",
};

export default function Layout({ children }) {
  return (
    <div className="flex h-screen w-full justify-center items-center md:flex-row md:overflow-hidden">
      <div className="w-full flex flex-col justify-center md:border-2 md:border-gray-200 bg-white  items-center md:w-[400px] rounded-lg pb-10 pt-5 md:shadow-md">
        <div className=" w-32 h-32 rounded-full bg-gray-200 ">
          <Image
            src={userProfileImage}
            loading="eager"
            priority={true}
            alt="profile image"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
