import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { ArrowLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { fetchRequest } from '../redux/slices/requestSlice';
import axiosinstance from '../axios/axios';
import socket from '../socket';
import { motion } from "framer-motion";

const Chat = () => {
            const dispatch = useDispatch();
            const { user } = useSelector((state) => state.auth);
            const { loading, error } = useSelector((state) => state.request);
            const [chats, setChats] = useState([]);
            const [selectedUserName, setSelectedUserName] = useState("")

            const [messages, setMessages] = useState([]);
            const [selectedUserId, setSelectedUserId] = useState(null);
            const [messageInput, setMessageInput] = useState('');
            const messagesEndRef = useRef(null);

            // Connect to socket and setup listener
            useEffect(() => {
                        socket.on("receiveMessage", (msg) => {
                                    // Add incoming message to local state
                                    setMessages(prev => [...prev, msg]);
                        });
                        // Clean up
                        return () => {
                                    socket.off("receiveMessage");
                        };
            }, []);


            useEffect(() => {
                        const getChats = async () => {
                                    try {
                                                const { data } = await axiosinstance.get("/chats/user");
                                                setChats(data.requests)
                                    } catch (error) {
                                                console.log(error)
                                    }

                        }

                        getChats();
            }, [])
            // Fetch accepted requests (chat list) on mount
            useEffect(() => {
                        dispatch(fetchRequest());
            }, [dispatch]);

            // Fetch messages when user selects a chat
            useEffect(() => {
                        const getMessages = async () => {
                                    if (!selectedUserId) return;
                                    try {
                                                const { data } = await axiosinstance.get(`/messages/${selectedUserId}`);
                                                setMessages(data.messages); // adjust to your backend response
                                    } catch (error) {
                                                console.error("Error fetching messages:", error);
                                    }
                        };
                        getMessages();
            }, [selectedUserId]);

            // Scroll to bottom when messages change
            useEffect(() => {
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, [messages]);

            // Send message
            const handleSendMessage = async (e) => {
                        e.preventDefault();
                        if (!messageInput.trim() || !selectedUserId) return;

                        const newMsg = {
                                    receiverId: selectedUserId,
                                    text: messageInput
                        };
                        try {
                                    // Send to socket       
                                    socket.emit("sendMessage", newMsg);

                                    // Optimistic UI: show immediately
                                    setMessages(prev => [
                                                ...prev,
                                                {
                                                            ...newMsg,
                                                            senderId: user._id,
                                                            createdAt: new Date().toISOString()
                                                }
                                    ]);

                                    setMessageInput('');
                        } catch (error) {
                                    console.error("Error sending message:", error);
                        }
            };

            const handleSelectUser = async (userId) => {
                        try {
                                    setSelectedUserId(userId);
                                    const { data } = await axiosinstance.get(`/auth/user/${userId}`);
                                    setSelectedUserName(data.user.name)
                                    // setMessages([]);     
                        } catch (error) {
                                    console.log(error)
                        }
            };

            const getUserInitial = (name) => name?.charAt(0)?.toUpperCase() || '?';

            if (!user) return <div className="text-center py-12 text-[var(--color-neutral-text)] text-lg">Please log in to view chats</div>;
            if (loading) return <div className="text-center py-12 text-[var(--color-neutral-text)] text-lg">Loading...</div>;
            if (error) return <div className="text-[var(--color-error)] text-center py-12 text-lg">{error}</div>;

            return (
                        <div className="h-[90vh]  bg-[var(--color-neutral-bg)] py-6 px-4 sm:px-6 lg:px-8">
                                    <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="max-w-7xl mx-auto flex flex-col md:flex-row h-[calc(98vh-80px)] gap-4">

                                                {/* 🗂 Chat list */}
                                                <div className={`w-full md:w-1/3 bg-white shadow-lg rounded-xl   p-4 ${selectedUserId ? 'hidden md:block' : 'block'} animate-fade-in`}>
                                                            <h2 className="text-heading text-xl sm:text-2xl font-semibold mb-4">Conversations</h2>
                                                            {chats.length === 0 ? (
                                                                        <p className="text-body text-base">No conversations yet</p>
                                                            ) : (
                                                                        <div className="space-y-2">
                                                                                    {chats.map((conv) => (
                                                                                                <div
                                                                                                            key={conv._id}
                                                                                                            onClick={() => handleSelectUser(conv.otherUser._id)}
                                                                                                            className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedUserId === conv.otherUser._id
                                                                                                                        ? 'bg-[var(--color-primary-light)] text-white'
                                                                                                                        : 'hover:bg-[var(--color-neutral-light)]'
                                                                                                                        } transition-colors duration-200`}
                                                                                                >
                                                                                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-white text-lg font-bold mr-3">
                                                                                                                        {getUserInitial(conv.otherUser.name)}
                                                                                                            </div>
                                                                                                            <div className="flex-1">
                                                                                                                        <p className="text-base font-semibold">{conv.otherUser.name}</p>
                                                                                                                        <p className="text-sm text-[var(--color-neutral-text)] truncate">Click to open chat</p>
                                                                                                            </div>
                                                                                                </div>
                                                                                    ))}
                                                                        </div>
                                                            )}
                                                </div>

                                                {/* 💬 Messages area */}
                                                <div className={`w-full md:w-2/3 lg:h-[60vh] min-h-[85vh] shadow-lg rounded-xl p-4 flex flex-col ${selectedUserId ? 'block' : 'hidden md:block'}`}>
                                                            {selectedUserId ? (
                                                                        <>
                                                                                    {/* Header */}
                                                                                    <div className="flex items-center justify-between mb-4">
                                                                                                <div className="flex items-center">
                                                                                                            <button onClick={() => setSelectedUserId(null)} className="md:hidden mr-3 text-[var(--color-neutral-text)] hover:text-[var(--color-primary)]">
                                                                                                                        <ArrowLeftIcon className="w-6 h-6" />
                                                                                                            </button>
                                                                                                            <h2 className="text-heading text-xl sm:text-2xl font-semibold">
                                                                                                                        {/* {chats.find(c => c.toUserId._id === selectedUserId)?.toUserId.name || 'Chat'} */}
                                                                                                                        {selectedUserId && selectedUserName}
                                                                                                            </h2>
                                                                                                </div>
                                                                                    </div>

                                                                                    {/* Messages */}
                                                                                    <div className="flex-1  overflow-y-auto p-4 space-y-4">
                                                                                                {messages.length === 0 ? (
                                                                                                            <p className="text-body text-base text-center">No messages yet</p>
                                                                                                ) : (
                                                                                                            messages.map((msg, idx) => (
                                                                                                                        <div
                                                                                                                                    key={msg._id || idx} // fallback key
                                                                                                                                    className={`flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                                                                                                                        >
                                                                                                                                    <div className={`max-w-[70%] p-3 rounded-lg flex items-start gap-2 ${msg.senderId === user._id
                                                                                                                                                ? 'bg-[var(--color-primary-light)] text-white'
                                                                                                                                                : 'bg-[var(--color-neutral-light)] text-[var(--color-neutral-text)]'
                                                                                                                                                }`}>
                                                                                                                                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold flex items-center justify-center">
                                                                                                                                                            {getUserInitial(msg.senderId === user._id ? user.name : chats.find(c => c.otherUser._id === msg.senderId)?.otherUser.name)}

                                                                                                                                                </div>
                                                                                                                                                <div>
                                                                                                                                                            <p className="text-base">{msg.text}</p>
                                                                                                                                                            <p className={`text-xs ${msg.senderId === user._id ? "text-white" : "text-[var(--color-neutral-text)]"} mt-1 `}>{format(new Date(msg.createdAt), 'p')}</p>
                                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                        </div>
                                                                                                            ))
                                                                                                )}
                                                                                                <div ref={messagesEndRef} />
                                                                                    </div>

                                                                                    {/* Input */}
                                                                                    <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
                                                                                                <input
                                                                                                            type="text"
                                                                                                            value={messageInput}
                                                                                                            onChange={(e) => setMessageInput(e.target.value)}
                                                                                                            placeholder="Type a message..."
                                                                                                            className="flex-1 p-2 rounded-lg border border-[var(--color-neutral-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
                                                                                                />
                                                                                                <button disabled={!messageInput} type="submit" className="btn-primary flex  items-center justify-center px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                                                                                            <PaperAirplaneIcon className={`w-5 h-5 transition-transform ${!messageInput ? "rotate-0" : "-rotate-30"}`} />
                                                                                                </button>
                                                                                    </form>
                                                                        </>
                                                            ) : (
                                                                        <p className="text-body text-base text-center flex-1 flex items-center justify-center">Select a conversation to start chatting</p>
                                                            )}
                                                </div>
                                    </motion.div>
                        </div>
            );
};

export default Chat;
