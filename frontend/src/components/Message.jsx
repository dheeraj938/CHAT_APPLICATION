import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';

const Message = ({ message, onMessageDeleted }) => {
  const { authUser, otherUsers, selectedUser } = useSelector(store => store.user);
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if this is my message or others
  const isSentByMe = message?.senderId === authUser?._id;

  // Get sender info
  const getSenderInfo = () => {
    if (isSentByMe) {
      return authUser;
    } else {
      return otherUsers?.find(user => user._id === message?.senderId);
    }
  };

  const senderInfo = getSenderInfo();

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "now";
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return "now";
    }
  };

  // Fallback avatar if image fails
  const getAvatarFallback = () => {
    const name = senderInfo?.fullName || "User";
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials;
  };

  const handleDeleteMessage = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `http://localhost:8080/api/v1/message/delete/${message._id}`,
        { withCredentials: true }
      );
      toast.success("Message deleted");
      if (onMessageDeleted) {
        onMessageDeleted(message._id);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`chat ${isSentByMe ? 'chat-end' : 'chat-start'} mb-2 sm:mb-3 lg:mb-4 group px-1 sm:px-2 lg:px-0`}>
      <div className="chat-image avatar">
        <div className={`w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full border-2 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 ${
          isSentByMe ? 'border-indigo-400' : 'border-slate-500'
        }`}>
          {imageError ? (
            <span className="text-white font-bold text-[9px] sm:text-xs flex items-center justify-center w-full h-full">{getAvatarFallback()}</span>
          ) : (
            <img
              src={senderInfo?.ProfilePhoto || `https://avatar.iran.liara.run/public/boy?username=${senderInfo?.username}`}
              alt={senderInfo?.fullName}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>

      <div className="chat-header mb-0.5 sm:mb-1 lg:mb-2 opacity-70 text-[10px] sm:text-xs">
        <span className={`font-semibold hidden sm:inline ${isSentByMe ? 'text-indigo-400' : 'text-slate-400'}`}>
          {senderInfo?.fullName}
        </span>
        <time className="text-[9px] sm:text-xs opacity-60 text-slate-500 ml-1 sm:ml-2">
          {formatTime(message?.timestamp || message?.createdAt)}
        </time>
      </div>

      <div className="flex items-end gap-1">
        <div className={`chat-bubble break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg transition-all rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm md:text-base ${
          isSentByMe
            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none'
            : 'bg-slate-700 text-slate-100 rounded-bl-none'
        }`}>
          <p>{message?.message}</p>
        </div>
        
        {isSentByMe && (
          <button
            onClick={handleDeleteMessage}
            disabled={isDeleting}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 sm:p-1 hover:bg-red-600/20 rounded text-red-400 hover:text-red-300 flex-shrink-0"
            title="Delete message"
          >
            <FiTrash2 size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
