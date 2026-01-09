import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user, isOnline = false }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const [imageError, setImageError] = useState(false);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  }

  // Fallback avatar with initials
  const getAvatarFallback = () => {
    const name = user?.fullName || "User";
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials;
  };

  const isSelected = selectedUser?._id === user?._id;

  return (
    <div
      onClick={() => selectedUserHandler(user)} 
      className={`flex gap-2 sm:gap-3 items-center p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 group ${
        isSelected 
          ? 'bg-gradient-to-r from-indigo-600 to-blue-700 shadow-lg shadow-indigo-600/50 sm:scale-105' 
          : 'hover:bg-slate-700/50 bg-slate-800/30'
      }`}
    >
      {/* Avatar */}
      <div className={`avatar ${isOnline ? 'online' : 'offline'} flex-shrink-0 relative`}>
        <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-all ${
          isSelected 
            ? 'border-indigo-300 ring ring-indigo-400 ring-offset-2 ring-offset-slate-900' 
            : 'border-slate-600'
        }`}>
          {imageError ? (
            <span className="text-white font-bold text-xs flex items-center justify-center w-full h-full">{getAvatarFallback()}</span>
          ) : (
            <img
              src={user?.ProfilePhoto || `https://avatar.iran.liara.run/public/boy?username=${user?.username}`}
              alt={user?.fullName}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <p className={`font-semibold truncate text-sm sm:text-base ${isSelected ? 'text-white' : 'text-slate-100'}`}>
          {user?.fullName}
        </p>
        <span className={`text-xs sm:text-sm truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
          @{user?.username}
        </span>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="flex-shrink-0 text-white text-base sm:text-lg animate-pulse">
          ✓
        </div>
      )}
    </div>
  );
}

export default OtherUser;
