import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useChat } from "../Context/ChatContext";

const Navbar = () => {
  const { theme, themeName, toggleTheme } = useContext(ThemeContext);
  const { onlineUsers } = useChat();

  return (
    <nav
      style={{ backgroundColor: theme.background, color: theme.color }}
      className={
        "mx-auto px-4 sm:px-10 lg:px-40 h-[8vh] shadow-md flex justify-between items-center transition duration-500 border-b " +
        (themeName === "darkTheme" ? "border-gray-500" : "border-gray-300")
      }
    >
      <Link
        to="/"
        className="hover:opacity-80 transition-opacity duration-300 flex items-center space-x-3"
      >
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <FontAwesomeIcon
              icon={faKey}
              className="text-white text-lg transform rotate-45"
            />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <span className="font-bold font-mono text-xl sm:text-2xl lg:text-2xl tracking-tight bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          CipherChat
        </span>
      </Link>
      <div className="flex gap-4 items-center">
        <button
          className="hover:bg-gray-400 w-10 h-10 rounded-md transition duration-500"
          onClick={toggleTheme}
        >
          {themeName === "darkTheme" ? (
            <FontAwesomeIcon icon={faSun} size="xl" />
          ) : (
            <FontAwesomeIcon icon={faMoon} size="xl" />
          )}
        </button>
        <p className="font-medium text-lg tracking-wide">
          {onlineUsers.length} online
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
