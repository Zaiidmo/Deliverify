import React, { useState, useEffect } from 'react';
import { DarkModeToggler } from './DarkModeToggler';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Sidebar from './Sidebar';
import { isAuthenticated } from '../RouteGuards';
import LogoutButton from '../Auth/LogoutButton';
import ShoppingCartComponent from '../ShoppingCart';

const NavBar = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setIsMenuOpen(false);

    // Récupérer les éléments du panier depuis le localStorage
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [isAuthenticated()]);

  return (
    <>
      <header className="fixed z-30 w-full h-20 font-poppins py-3 flex justify-between items-center text-black dark:text-white bg-[rgba(255,255,255,0.13)] backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] rounded-b-[5px] border-b-2 border-solid border-[rgba(255,255,255,0.1)] dark:bg-[rgba(0,0,0,0.5)]">
        <div className="px-4 max-w-screen-xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
            <Link
                aria-current="page"
                className="flex items-center text-black dark:text-white"
                to="/"
              >
                <img src="/logo-desktop-white.png" className="w-32 hidden dark:md:block" />
                <img src="/logo-desktop-black.png" className="w-32 dark:hidden hidden md:block" />
                <img src="/logo-mobile-white.png" className="w-14 hidden dark:block dark:md:hidden md:hidden" />
                <img src="/logo-mobile-black.png" className="w-14 dark:hidden md:hidden" />
              </Link>
            </div>
            <div className="flex items-center justify-end gap-3">
              <DarkModeToggler />
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="h-10 w-10 p-2 rounded-full dark:hover:bg-gray-200 hover:bg-violet-500 transition-all duration-200"
                >
                  <ShoppingCart className="text-black dark:text-yellow-500" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-100 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10">
                    <ShoppingCartComponent />
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-10 w-10 p-2 rounded-full dark:hover:bg-gray-200 hover:bg-violet-500 transition-all duration-200"
              >
                {!isMenuOpen ? (
                  <Menu className="text-black dark:text-yellow-500" />
                ) : (
                  <X className="text-black dark:text-yellow-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isAuth ? (
          <LogoutButton />
        ) : (
          <Link
            className="inline-flex items-center justify-center rounded-md bg-transparent p-2 py-2 text-sm  border-black dark:border-yellow-500 dark:text-white shadow-sm transition-all duration-150 hover:bg-black hover:border-white hover:dark:border-white hover:text-white"
            to="/Register"
          >
            
          </Link>
        )}
      </header>
      {isMenuOpen ? <Sidebar /> : null}
    </>
  );
};

export default NavBar;