import React from "react";
import { useEffect, useState } from "react";
import { DarkModeToggler } from "./DarkModeToggler";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./RouteGuards";
import LogoutButton from "./LogoutButton";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className=" fixed z-30 w-full h-18 font-poppins py-3 flex justify-between items-center text-black dark:text-white bg-[rgba(255,255,255,0.13)] backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] rounded-b-[5px] border-b-2 border-solid border-[rgba(255,255,255,0.1)] dark:bg-[rgba(0,0,0,0.5)]">
        <div className="px-4 max-w-screen-xl mx-auto w-full ">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <Link
                aria-current="page"
                className="flex items-center text-black dark:text-white"
                to="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width="45"
                  height="45"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="m56.79 200.58l12.36 7.5l7.35-13.58C93.07 166.75 143.78 102 256 102c115 0 164 70.32 180.1 93.46l8.16 12.7L469.88 192l-8.54-13.36c-8.88-12.85-27.52-39.53-60.78-63.1C360.15 86.82 311.5 72.25 256 72.25c-128.07 0-186.69 75.11-206 107.25L42.63 192L54 198.86a14 14 0 0 0 1.63 1.1a13 13 0 0 0 1.16.62"
                  />
                  <path
                    fill="currentColor"
                    d="M379.22 172.32c-35.54-28.93-78.12-44.25-123.22-44.25c-97.52 0-162.31 66-183.33 131.47C53.42 320 76.82 407.61 77.8 411.36l4.38 13.81l29.93-6.43l-4.74-15c-.21-.75-22.1-82.93-5.41-135.21c9-28.08 27.73-55.4 51.35-74.79C181.81 170.39 217.35 158 256 158c90.58 0 141.93 70.61 156.45 108.11c11.27 28.93 8.67 61.82-6.28 82c-5.53 7.39-15.28 16.07-30.12 15.32c-33.81-1.72-39.66-18.43-47.79-50.25c-3.9-15.32-7.9-31.18-17.87-44c-12.14-15.75-29.8-23.36-54.28-23.36c-26.33 0-46.27 8.68-59.38 25.72c-28.6 37.28-10 100.93-9.21 103.61l.22.85c1.41 3.86 36.08 96.65 128.93 119.68l14.77 3.21l8.09-28.71l-15.27-3.43c-74.22-18.43-105.21-94.39-107.59-100.39a152.4 152.4 0 0 1-5.1-29.79c-1.08-14.46-.32-34.39 9.43-47.14c7.15-9.32 18.64-13.82 35-13.82c29.79 0 34.78 14.57 42.58 44.79c7.58 29.46 18 69.85 75.84 72.75c22.21 1.07 42.26-8.79 56.34-27.65c21.13-28.28 25.14-71.57 10.19-110.14c-11.68-30.36-34.21-60.54-61.73-83.04"
                  />
                  <path
                    fill="currentColor"
                    d="M154.18 343.21c-3.47-28.28 1.41-71 26.55-98.78c17.44-19.29 42.79-29 75.19-29c37.49 0 65.87 16.72 84.51 49.61a154 154 0 0 1 17.88 53.25l1.43 14.69l30-2.2a113 113 0 0 0-1-15.6c-.11-1.28-3.57-32.46-21-63.75c-24.06-43.11-62.63-65.93-111.74-65.93c-41.5 0-74.55 13.18-98.06 39.11c-31.85 35.14-38.35 86.25-33.91 122.35v.33c7.97 54.53 28.97 98.14 66.12 137.14l11.6 11.22l20.95-21.79l-10.34-9.79c-32.72-34.28-51.25-72.64-58.18-120.86M132.47 72.66c11.08-6.72 50.27-26.77 123.53-26.77c87.54 0 126.44 28.72 126.87 28.93l13.9 8.86L413 58.47l-13.22-8.56c-.52-.38-1.06-.76-1.6-1.12C385.5 40.54 340.54 16 256 16c-87.71 0-132.75 26.48-143.41 33.71L99 58.52l16.2 25.21Z"
                  />
                  <path
                    fill="currentColor"
                    d="M390.59 415.21c-33.37 3.75-60.45-2.67-80.71-18.85c-34.24-27.43-38.68-75.11-38.79-76l-1.23-14.88l-30.53 2.23l1.31 15c.22 2.46 5.2 60.75 49.62 96.54c22.11 17.89 49.74 26.89 82.24 26.89a187 187 0 0 0 21.56-1.29l16.59-2.09l-6.1-29.71Z"
                  />
                </svg>
                {/* <p className="">Authentication</p> */}
              </Link>
            </div>
            <div className="flex items-center justify-end gap-3">
              <DarkModeToggler />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-10 w-10 p-2 rounded-full dark:hover:bg-gray-200 hover:bg-violet-500 transition-all duration-200"
              >
              {!isMenuOpen ? (
                <Menu className="text-black dark:text-yellow-500" />) : (
                <X className="text-black dark:text-yellow-500" />
                )}
              </button>

            </div>
          </div>
        </div>
              {/* {isAuth ? ( 
              <LogoutButton />
            ) : (<Link
                className="inline-flex items-center justify-center rounded-md bg-transparent p-2 py-2 text-sm  border border-black  dark:border-yellow-500 dark:text-white shadow-sm transition-all duration-150 hover:bg-black hover:border-white hover:dark:border-white hover:text-white"
                to="/Register"
              >
                Get Started
              </Link>
            )} */}
      </header>
            {isMenuOpen ? <Sidebar /> : null}  
    </>
  );
};


export default NavBar;
