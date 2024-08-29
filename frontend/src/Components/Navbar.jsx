import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useChat } from "../Context/ChatContext"

const Navbar = () => {

    const { theme, themeName, toggleTheme } = useContext(ThemeContext);
    const { onlineUsers } = useChat()

    return (
        <nav
            style={{ backgroundColor: theme.background, color: theme.color }}
            className={"mx-auto px-4 sm:px-10 lg:px-40 h-[8vh] shadow-md flex justify-between items-center transition duration-500 border-b " + (themeName === "darkTheme" ? "border-gray-500" : "border-gray-300")} >
            <p
                className="font-bold text-xl sm:text-2xl lg:text-2xl tracking-wide">
                <FontAwesomeIcon icon={faKey} /><Link to="/">&nbsp;&nbsp;cipher chat</Link>
            </p>
            <div className="flex gap-4 items-center">
                <button className="hover:bg-gray-400 w-10 h-10 rounded-md transition duration-500" onClick={toggleTheme}>{themeName === "darkTheme" ? <FontAwesomeIcon icon={faSun} size="xl" /> : <FontAwesomeIcon icon={faMoon} size="xl" />}</button>
                <p
                    className="font-medium text-lg tracking-wide">
                    {onlineUsers.length} online
                </p>
            </div>
        </nav>
    )
}

export default Navbar