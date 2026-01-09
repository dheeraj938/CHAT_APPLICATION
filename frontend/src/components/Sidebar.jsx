import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchInput } from '../redux/userSlice';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import useThemeBackground from '../hooks/useThemeBackground';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeStyle = useThemeBackground();
  const { authUser } = useSelector(store => store.user);
  const { currentTheme } = useSelector(store => store.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [authPhotoError, setAuthPhotoError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Theme-specific colors for accents
  const accentColors = {
    midnight: { from: 'from-indigo-600', to: 'to-blue-600', ring: 'ring-indigo-400', hover: 'hover:from-indigo-700 hover:to-blue-700' },
    ocean: { from: 'from-blue-600', to: 'to-cyan-600', ring: 'ring-blue-400', hover: 'hover:from-blue-700 hover:to-cyan-700' },
    forest: { from: 'from-green-600', to: 'to-emerald-600', ring: 'ring-green-400', hover: 'hover:from-green-700 hover:to-emerald-700' },
    wine: { from: 'from-red-600', to: 'to-rose-600', ring: 'ring-red-400', hover: 'hover:from-red-700 hover:to-rose-700' }
  };

  const accent = accentColors[currentTheme] || accentColors.midnight;

  const getAuthUserAvatarFallback = () => {
    if (!authUser?.fullName) return 'U';
    const initials = authUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials;
  };

  React.useEffect(() => {
    if (authUser) {
      console.log('Auth User Data:', authUser);
      console.log('Auth User ProfilePhoto:', authUser?.ProfilePhoto);
    }
  }, [authUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(searchQuery));
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    dispatch(setSearchInput(value));
  }

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      console.log(res);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className={`lg:hidden fixed top-3 sm:top-4 left-3 sm:left-4 z-50 p-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${accent.from} ${accent.to} ${accent.hover} text-white transition-all`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <AiOutlineClose size={20} className="sm:w-6 sm:h-6" /> : <AiOutlineMenu size={20} className="sm:w-6 sm:h-6" />}
      </button>

      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 w-full sm:max-w-sm lg:max-w-sm lg:w-80 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 flex flex-col h-full shadow-2xl border-r border-slate-700/50 backdrop-blur-xl`}>
        
        {/* Header - Logged In User Info */}
        {authUser && (
          <div className={`p-4 sm:p-5 bg-gradient-to-r ${accent.from} ${accent.to} shadow-lg`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`avatar online ring ${accent.ring} ring-offset-2 ring-offset-slate-900 flex-shrink-0`}>
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-indigo-300 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  {!authPhotoError ? (
                    <img 
                      src={authUser?.ProfilePhoto || `https://avatar.iran.liara.run/public/boy?username=${authUser?.username}`} 
                      alt="user avatar"
                      className="w-full h-full object-cover"
                      onError={() => setAuthPhotoError(true)}
                    />
                  ) : (
                    <span className="text-white font-bold text-sm sm:text-lg flex items-center justify-center w-full h-full">{getAuthUserAvatarFallback()}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm sm:text-base truncate">{authUser?.fullName}</p>
                <p className="text-xs text-white/80">@{authUser?.username}</p>
                <p className="text-xs text-white/70 mt-1">✓ Online</p>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-700/50">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs sm:text-sm" />
              <input 
                value={searchQuery}
                onChange={handleSearchChange}
                className="input input-sm w-full pl-9 sm:pl-10 text-sm sm:text-base bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition rounded-lg" 
                type="text" 
                placeholder='Search...' 
              /> 
            </div>
          </form>
        </div>

        {/* Other Users List */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4 space-y-1 sm:space-y-2 scrollbar-hide">
          <OtherUsers />
        </div>

        {/* Logout Button */}
        <div className="p-3 sm:p-4 border-t border-slate-700/50">
          <button 
            onClick={logoutHandler} 
            className="btn btn-sm btn-block text-sm sm:text-base bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold border-0 rounded-lg transition-all hover:shadow-lg hover:shadow-red-600/50"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
