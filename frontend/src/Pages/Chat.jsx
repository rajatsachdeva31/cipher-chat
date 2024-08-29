import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import Messages from '../Components/Messages'
import Input from '../Components/Input'
import { socket } from '../Connection/Socket'
import { useChat } from '../Context/ChatContext'
import { useNavigate } from 'react-router-dom'

const Chat = () => {

    const { theme } = useContext(ThemeContext)
    const { userId, onlineUsers, setIsSearching, setMessages } = useChat()

    const navigate = useNavigate()

    const newChat = () => {
        setIsSearching(true)
        setMessages([])
        socket.emit("paired", userId, (error) => {
            return
        })
        return () => {
            socket.off("paired");
        };
    }

    useEffect(() => {
        if (userId && onlineUsers.find((user) => user.userId === userId)) {
            newChat()
        } else {
            navigate("/")
        }
    }, []);

    return (
        <div className="h-[92vh] flex flex-col gap-2 px-4 sm:px-10 lg:px-40 py-2 overflow-scroll transition duration-500" style={{ backgroundColor: theme.background, color: theme.color }} >
            <Messages />
            <Input />
        </div>
    )
}

export default Chat