import { useState } from "react";
import { Link } from "@remix-run/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background text-text p-4 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="absolute left-4 md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-text">Fish Aquarium</h1>
        </div>
        <div className="hidden md:block">
          <Link
            to="/explore"
            className="px-4 py-2 bg-secondary text-background rounded hover:bg-secondary-dark transition duration-300"
          >
            Explore
          </Link>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-background md:hidden`}
      >
        <div className="p-4 shadow-md flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text">Menu</h2>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-text"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 p-4">
          <Link
            to="/explore"
            onClick={toggleMenu}
            className="block px-4 py-2 bg-secondary text-background rounded hover:bg-secondary-dark transition duration-300"
          >
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
