import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import { Link } from 'react-router-dom';
import { useChat } from "../Context/ChatContext"
import { socket } from '../Connection/Socket';

const Home = () => {

    const { theme } = useContext(ThemeContext)
    const { userId, receiver, isSearching, setReceiver, setIsTyping, setMessage, setIsSearching } = useChat()

    useEffect(() => {

        if (userId && isSearching) {
            socket.emit('closed', userId, () => {
                setIsSearching(false)
            })
        }

        if (receiver) {
            socket.emit('unpaired', receiver, () => {
                setReceiver('')
                setMessage('')
                setIsTyping(false)
            })
        }

        return () => {

        }
    })

    return (
        <div className="h-[92vh] text-center px-4 sm:px-10 lg:px-40 py-10 overflow-scroll transition duration-500" style={{ backgroundColor: theme.background, color: theme.color }} >
            <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold">securely chat with like minded strangers</h1>
            <div className="py-5 md:py-10 flex flex-col md:flex-row justify-center items-center gap-4">
                <input
                    type="text"
                    name="interest"
                    id="interrest"
                    autoFocus
                    className="outline-none outline-offset-0 focus:outline-sky-500 text-gray-800 h-14 px-4 text-md md:text-lg shadow-md border rounded-lg w-[350px] sm:w-[400px]"
                    placeholder="add your interest(s)"
                />
                <div className="flex items-center">
                    <Link to="/chat"><button type="button" className="h-14 rounded-lg text-md md:text-lg shadow-md bg-sky-500 text-gray-100 w-24 tracking-wide cursor-pointer hover:bg-sky-700 transition duration-500">text</button></Link>
                    <span className="mx-2 text-md md:text-lg">or</span>
                    <button type="button" className="h-14 rounded-lg text-md md:text-lg shadow-md bg-sky-500 text-gray-100 w-24 tracking-wide cursor-not-allowed opacity-50 transition duration-500">video</button>
                    <span className="ml-2 text-gray-500">(coming soon)</span>
                </div>
            </div>
        </div>
    )
}

export default Home