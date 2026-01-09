import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


const Messages = () => {
  useGetMessages();
  const dispatch = useDispatch();
  const { messages } = useSelector(store => store.message);
  const { selectedUser } = useSelector(store => store.user);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  const handleMessageDeleted = (messageId) => {
    // Remove the deleted message from the Redux state
    const updatedMessages = messages.filter(msg => msg._id !== messageId);
    dispatch(setMessages(updatedMessages));
  };

  if (!selectedUser) {
    return (
      <div className="px-3 sm:px-4 flex-1 overflow-auto flex items-center justify-center">
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg">Select a user to start chatting</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="px-3 sm:px-4 flex-1 overflow-auto flex items-center justify-center">
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 lg:px-6 flex-1 overflow-auto bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 space-y-2 py-3 sm:py-4 scrollbar-hide">
      {messages?.map((message) => (
        <Message 
          key={message._id || message.timestamp} 
          message={message}
          onMessageDeleted={handleMessageDeleted}
        />
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages
