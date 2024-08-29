import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext'
import { useChat } from "../Context/ChatContext"

const Messages = () => {

    const { themeName } = useContext(ThemeContext)
    const { isSearching, receiver, messages, isTyping } = useChat()

    return (
        <div className={"h-[84vh] flex flex-col justify-end rounded-lg shadow-md px-4 py-2 transition duration-500 " + (themeName === "darkTheme" ? "bg-gray-700" : "bg-gray-50")}>

            {!isSearching && !receiver && receiver !== '' && <p className="italic m-2" id="looking">start a new conversation</p>}

            {isSearching && <p className="italic m-2" id="looking">looking for strangers...</p>}

            {receiver && <p className="italic m-2" id="looking">stranger has connected</p>}

            <div className="flex flex-col overflow-scroll" id="chats">
                {messages.map((message, index) => (
                    message?.you ?
                        <p key={index} className={"sender w-fit m-2 p-2 text-md md:text-lg self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-md transition duration-500 " + (themeName === "darkTheme" ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-gray-50")}>{message.you}</p>
                        :
                        <p key={index} className={"receiver w-fit m-2 p-2 text-md md:text-lg self-start rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-md transition duration-500 " + (themeName === "darkTheme" ? "bg-gray-200 text-gray-800" : "bg-gray-800 text-gray-50")}>{message.stranger}</p>
                ))}
            </div>

            {isTyping && <p className="italic" id="typing">stranger is typing...</p>}

            {!isSearching && !receiver && receiver === '' && <p className="italic m-2" id="looking">stranger has disconnected</p>}

        </div>
    )
}

export default Messages