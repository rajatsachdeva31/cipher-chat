import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { socket } from "../Connection/Socket";
const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [isSearching, setIsSearching] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [receiver, setReceiver] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (receiver) {
        socket.emit("unpaired", receiver);
      }
      if (userId && isSearching) {
        socket.emit("closed", userId);
      }
    };

    const handleUnload = () => {
      if (receiver) {
        socket.emit("unpaired", receiver);
      }
      socket.disconnect();
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      // Cleanup event listeners
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [receiver, userId, isSearching]);

  useEffect(() => {
    socket.on("userDisconnected", (disconnectedUserId) => {
      if (receiver === disconnectedUserId) {
        setReceiver("");
        setMessage("");
        setIsTyping(false);
        // Optionally show a notification
        alert("Your chat partner disconnected");
      }
    });

    socket.on("partnerDisconnected", () => {
      setReceiver("");
      setMessage("");
      setIsTyping(false);
      // Optionally show a notification
      alert("Your chat partner disconnected");
    });

    return () => {
      socket.off("userDisconnected");
      socket.off("partnerDisconnected");
    };
  }, [receiver]);

  return (
    <ChatContext.Provider
      value={{
        userId,
        setUserId,
        messages,
        setMessages,
        onlineUsers,
        setOnlineUsers,
        isConnected,
        setIsConnected,
        receiver,
        setReceiver,
        isSearching,
        setIsSearching,
        isTyping,
        setIsTyping,
        isSending,
        setIsSending,
        message,
        setMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useChat = () => useContext(ChatContext);

export { ChatContext, ChatContextProvider, useChat };
