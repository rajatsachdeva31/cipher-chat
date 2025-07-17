import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { useChat } from "../Context/ChatContext";

const Messages = () => {
  const { themeName } = useContext(ThemeContext);
  const { isSearching, receiver, messages, isTyping } = useChat();

  return (
    <div
      className={
        "h-[84vh] flex flex-col justify-end rounded-lg shadow-md px-4 py-2 transition duration-500 " +
        (themeName === "darkTheme" ? "bg-gray-700" : "bg-gray-50")
      }
    >
      {!isSearching && !receiver && receiver !== "" && (
        <p className="italic m-2" id="looking">
          start a new conversation
        </p>
      )}

      {isSearching && (
        <p className="italic m-2" id="looking">
          looking for strangers...
        </p>
      )}

      {receiver && (
        <p className="italic m-2" id="looking">
          stranger has connected
        </p>
      )}

      <div className="flex flex-col overflow-scroll" id="chats">
        {messages.map((message, index) =>
          message?.you ? (
            <div key={index} className="flex justify-end mb-3">
              <div className="relative max-w-xs lg:max-w-md">
                <p className="sender px-4 py-3 text-md md:text-lg rounded-2xl rounded-br-md shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                  {message.you}
                </p>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-blue-600 border-t-8 border-t-blue-600"></div>
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start mb-3">
              <div className="relative max-w-xs lg:max-w-md">
                <p
                  className={
                    "receiver px-4 py-3 text-md md:text-lg rounded-2xl rounded-bl-md shadow-lg " +
                    (themeName === "darkTheme"
                      ? "bg-gray-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200")
                  }
                >
                  {message.stranger}
                </p>
                <div
                  className={
                    "absolute bottom-0 left-0 w-0 h-0 border-l-8 border-r-8 border-r-transparent border-t-8 " +
                    (themeName === "darkTheme"
                      ? "border-l-gray-600 border-t-gray-600"
                      : "border-l-white border-t-white")
                  }
                ></div>
              </div>
            </div>
          )
        )}
      </div>

      {isTyping && (
        <p className="italic" id="typing">
          stranger is typing...
        </p>
      )}

      {!isSearching && !receiver && receiver === "" && (
        <p className="italic m-2" id="looking">
          stranger has disconnected
        </p>
      )}
    </div>
  );
};

export default Messages;
