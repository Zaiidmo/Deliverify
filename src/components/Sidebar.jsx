import { DoorOpen, Home, LogIn, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./RouteGuards";
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { SidebarButton } from "./SidebarButton";
import LogoutButton from "./LogoutButton";
const Sidebar = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };

    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  return (
    <div
      id="drawer-navigation"
      className="fixed top-[4.5rem] right-0 z-20 h-screen p-4 overflow-y-auto transition-transform font-poppins  text-black dark:text-white bg-[rgba(255,255,255,0.13)] backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] rounded-b-[5px] border-b-2 border-solid border-[rgba(255,255,255,0.1)]  dark:bg-[rgba(0,0,0,0.5)]"
      tabIndex="-1"
      aria-labelledby="drawer-navigation-label"
    >
      <div className="flex flex-col justify-center items-center gap-y-2 py-4">
        {/* Logo */}
        {/* <div className="mb-4">
          <a className="flex-none focus:outline-none focus:opacity-80" href="#">
            <svg className="w-10 h-auto" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="10" fill="black" />
              <path
                d="M37.656 68V31.6364H51.5764C54.2043 31.6364 56.3882 32.0507 58.1283 32.8793C59.8802 33.696 61.1882 34.8146 62.0523 36.2351C62.9282 37.6555 63.3662 39.2654 63.3662 41.0646C63.3662 42.5443 63.0821 43.8108 62.5139 44.8643C61.9458 45.906 61.1823 46.7524 60.2235 47.4034C59.2646 48.0544 58.1934 48.522 57.0097 48.8061V49.1612C58.2999 49.2322 59.5369 49.6288 60.7206 50.3509C61.9162 51.0611 62.8927 52.0672 63.6503 53.3693C64.4079 54.6714 64.7867 56.2457 64.7867 58.0923C64.7867 59.9744 64.3309 61.6671 63.4195 63.1705C62.508 64.6619 61.1349 65.8397 59.3002 66.7038C57.4654 67.5679 55.1572 68 52.3754 68H37.656ZM44.2433 62.4957H51.3279C53.719 62.4957 55.4413 62.04 56.4948 61.1286C57.5601 60.2053 58.0928 59.0215 58.0928 57.5774C58.0928 56.5002 57.8264 55.5296 57.2938 54.6655C56.7611 53.7895 56.0035 53.103 55.021 52.6058C54.0386 52.0968 52.8667 51.8423 51.5054 51.8423H44.2433V62.4957ZM44.2433 47.1016H50.7597C51.896 47.1016 52.92 46.8944 53.8314 46.4801C54.7429 46.054 55.459 45.4562 55.9798 44.6868C56.5125 43.9055 56.7789 42.9822 56.7789 41.9169C56.7789 40.5083 56.2817 39.3482 55.2874 38.4368C54.3049 37.5253 52.843 37.0696 50.9017 37.0696H44.2433V47.1016Z"
                fill="white"
              />
            </svg>
          </a>
        </div> */}

        {/* Sidebar Menu Items */}
        <SidebarButton label="Home" icon={<Home />} href={"/"} />
        {!isAuth ? (
        <SidebarButton
          label="GetStarted"
          icon={<DoorOpen />}
          href={"register"}
        />
        ) : (
        <SidebarButton label="Logout" icon={<LogoutButton />}  />
        )}
      </div>
    </div>
  );
};
export default Sidebar;
