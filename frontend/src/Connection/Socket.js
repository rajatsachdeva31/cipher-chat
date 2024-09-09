import { useEffect } from "react"
import { io } from "socket.io-client"
import { useChat } from "../Context/ChatContext"
import { v4 } from "uuid"

// const URL = process.env.REACT_APP_BASE_URL
const URL = "http://localhost:8080/"

export const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 3
});

const Socket = () => {

    const { setUserId, setIsConnected, setMessages, setOnlineUsers, setReceiver, setIsSearching, setIsTyping, setMessage, setIsSending } = useChat()

    useEffect(() => {

        socket.connect()

        return () => {
            socket.disconnect()
        };

    }, []);

    useEffect(() => {

        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        return () => {

            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)

        };

    }, [setIsConnected]);

    useEffect(() => {

        const uniqueID = v4();
        setUserId(uniqueID)

        socket.emit('addNewUser', uniqueID, (error) => {
            if (error) {
                return alert(error)
            }
        });

        socket.on('getUsers', (users) => {
            setOnlineUsers(users)
        })

        socket.on('sendMessage', (message) => {
            setMessages((previous) => [...previous, { stranger: message }])
            setIsTyping(false)
        })

        socket.on('receiveMessage', (message) => {
            setMessages((previous) => [...previous, { you: message }])
            setIsSending(false)
        })

        socket.on('paired', (receiver) => {
            setReceiver(receiver)
            setIsSearching(false)
        })

        socket.on('unpaired', () => {
            setReceiver('')
            setMessage('')
            setIsTyping(false)
        })

        socket.on('closed', () => {
            setIsSearching(false)
        })

        socket.on('typing', () => {
            setIsTyping(true)
        })

        socket.on('notTyping', () => {
            setIsTyping(false)
        })

        return () => {
            socket.off('getUsers')
            socket.off('sendMessage')
            socket.off('addNewUser')
            socket.off('paired')
        };
    }, [setUserId, setIsConnected, setMessages, setOnlineUsers, setReceiver, setIsSearching, setIsTyping, setMessage, setIsSending]);
}

export default Socket
