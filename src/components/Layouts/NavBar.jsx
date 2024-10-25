import React from "react";
import { useEffect, useState } from "react";
import { DarkModeToggler } from "./DarkModeToggler";
import { Link } from "react-router-dom";
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
                <img src="/logo-desktop-white.png" className="w-20 hidden dark:md:block" />
                <img src="/logo-desktop-black.png" className="w-20 dark:hidden hidden md:block" />
                <img src="/logo-mobile-white.png" className="w-10 hidden dark:block dark:md:hidden md:hidden" />
                <img src="/logo-mobile-black.png" className="w-10 dark:hidden md:hidden" />
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
