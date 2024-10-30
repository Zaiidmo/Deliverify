import LogoutButton from "../Auth/LogoutButton";
import { isAuthenticated } from "../RouteGuards";
import { SidebarButton } from "./SidebarButton";
import { 
  ChefHat, 
  DoorOpen, 
  Home, 
  LayoutDashboard, 
  LogIn, 
  LogOut, 
  PersonStanding, 
  Sandwich, 
  Users,
  ClipboardList, 
  ScrollText 
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [isOpened, setIsOpened] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); 

  useEffect(() => {
    setIsOpened(false);
  }, [isAuth]);

  return (
    <div
      id="drawer-navigation"
      className="fixed right-0 z-10 h-screen p-4 overflow-y-auto transition-transform font-poppins text-black dark:text-white bg-[rgba(255,255,255,0.13)] backdrop-blur-[10px] shadow-[0_0_10px_rgba(8,7,16,0.6)] px-6 rounded-b-[5px] dark:bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
      tabIndex="-1"
      aria-labelledby="drawer-navigation-label"
    >
      <div className="flex flex-col justify-center items-center gap-y-4 py-4">
        {/* Logo section remains unchanged */}

        {/* Sidebar Menu Items */}
        <SidebarButton label="Home" icon={<Home />} href={"/"} />
        <SidebarButton
              label="Resto Manager"
              icon={<List />}
              href={"dashboard/manager"}
            />
        {/* <SidebarButton label="Ajouter Restaurant" icon={<PlusSquare />} href={"/dashboard"} /> */}
      
        {!isAuth ? (
          <SidebarButton
            label="GetStarted"
            icon={<DoorOpen />}
            href={"register"}
          />
        ) : (
          <>
            <SidebarButton label="Logout" icon={<LogoutButton />} />
            <SidebarButton
              label="Dashboard"
              icon={<LayoutDashboard />}
              href={"dashboard"}
            />
            <SidebarButton
              label="Restaurants"
              icon={<ChefHat/>}
              href={"dashboard/restaurants"}
            />
            <SidebarButton
              label="Meals"
              icon={<Sandwich />}
              href={"#"}
            />
            <SidebarButton
              label="Users"
              icon={<Users />}
              href={"dashboard/users"}
            />
            <SidebarButton
              label="Roles & Permissions"
              icon={<PersonStanding />}
              href={"dashboard/roles"}
            />
            
            {/* User Logs - visible to all authenticated users */}
            <SidebarButton
              label="My Logs"
              icon={<ClipboardList />}
              href={"user/logs"}
            />

            {/* Admin Logs - only visible to admins */}
            {isAdmin && (
              <SidebarButton
                label="System Logs"
                icon={<ScrollText />}
                href={"dashboard/logs"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;