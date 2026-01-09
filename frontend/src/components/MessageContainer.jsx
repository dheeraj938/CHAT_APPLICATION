import React, { useState } from 'react'
import Sendinput from './Sendinput'
import Messages from './Messages'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setMessages } from '../redux/messageSlice'
import { FiTrash2 } from 'react-icons/fi'

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, authUser } = useSelector(store => store.user);
  const [selectedPhotoError, setSelectedPhotoError] = useState(false);
  const [isDeleteAllLoading, setIsDeleteAllLoading] = useState(false);

  const getSelectedUserAvatarFallback = () => {
    if (!selectedUser?.fullName) return 'U';
    const initials = selectedUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials;
  };

  React.useEffect(() => {
    if (selectedUser) {
      console.log('Selected User Data:', selectedUser);
      console.log('Selected User ProfilePhoto:', selectedUser?.ProfilePhoto);
    }
  }, [selectedUser]);

  const handleDeleteAllMessages = async () => {
    if (!window.confirm('Are you sure you want to delete all messages with this user? This cannot be undone.')) {
      return;
    }

    try {
      setIsDeleteAllLoading(true);
      const res = await axios.delete(
        `http://localhost:8080/api/v1/message/deleteAll/${selectedUser?._id}`,
        { withCredentials: true }
      );
      toast.success("All messages deleted");
      dispatch(setMessages([]));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete messages");
    } finally {
      setIsDeleteAllLoading(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl">
        <div className="text-center space-y-4">
          <div className="text-5xl sm:text-6xl">💬</div>
          <p className="text-slate-300 text-lg sm:text-xl font-semibold">Welcome, {authUser?.fullName}!</p>
          <p className="text-slate-400 text-sm sm:text-base px-4">Select a user from the sidebar to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
      {/* Header with Selected User */}
      <div className="flex gap-2 sm:gap-4 items-center justify-between p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-lg flex-wrap sm:flex-nowrap">
        <div className="flex gap-2 sm:gap-3 items-center flex-1 min-w-0">
          <div className="avatar online ring ring-indigo-400 ring-offset-2 ring-offset-slate-900">
            <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-full border-2 border-indigo-300 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              {!selectedPhotoError ? (
                <img
                  src={selectedUser?.ProfilePhoto || `https://avatar.iran.liara.run/public/boy?username=${selectedUser?.username}`}
                  alt={selectedUser?.fullName}
                  className="w-full h-full object-cover"
                  onError={() => setSelectedPhotoError(true)}
                />
              ) : (
                <span className="text-white font-bold text-xs sm:text-base lg:text-lg flex items-center justify-center w-full h-full">{getSelectedUserAvatarFallback()}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <p className="font-bold text-white text-sm sm:text-base lg:text-lg truncate">{selectedUser?.fullName}</p>
            <p className="text-xs text-indigo-100 truncate">@{selectedUser?.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:block px-2 sm:px-3 py-1 bg-green-500/20 text-green-200 text-xs rounded-full font-semibold">
            🟢 Online
          </div>
          <button
            onClick={handleDeleteAllMessages}
            disabled={isDeleteAllLoading}
            className="btn btn-sm btn-ghost text-red-400 hover:bg-red-900/20 hover:text-red-200 rounded-lg transition"
            title="Delete all messages"
          >
            <FiTrash2 size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      </div>
      
      <Messages/>
      <Sendinput/>
    </div>
  )
}

export default MessageContainer
