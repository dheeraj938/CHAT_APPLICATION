import React from "react"
import { useState } from "react"

import { Link,useNavigate } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({...user,gender})
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
    
     const res = await axios.post("http://localhost:8080/api/v1/user/register", user, {
       headers: {
         "Content-Type": "application/json"
        
       },
       withCredentials: true
     });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
      

    } catch (error) {
        toast.error(error.response.data.message);
     console.log(error);
    
   }
    setUser({
       fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",

    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-700/50 backdrop-blur-xl">
        
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🚀</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 sm:mb-2">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">Join our chat community today</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4 sm:space-y-5">
          
          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Full Name
            </label>
            <input
              value={user.fullName}
              onChange={(e) =>setUser({...user,fullName:e.target.value})}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) =>setUser({...user,username:e.target.value})}
              type="text"
              placeholder="Choose a username"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Password
            </label>
            <input 
              value={user.password}
              onChange={(e) =>setUser({...user,password:e.target.value})}
              type="password"
              placeholder="Create a password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Confirm Password
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>setUser({...user,confirmPassword:e.target.value})}
              type="password"
              placeholder="Confirm password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
              Gender
            </label>
            <div className="flex gap-4 sm:gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={()=>handleCheckbox("male")}
                  className="w-4 h-4 rounded accent-indigo-600" 
                />
                <span className="text-slate-300 text-sm sm:text-base">Male</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={user.gender === "Female"}
                  onChange={()=>handleCheckbox("Female")}
                  className="w-4 h-4 rounded accent-indigo-600" 
                />
                <span className="text-slate-300 text-sm sm:text-base">Female</span>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl transition shadow-lg hover:shadow-indigo-600/50 mt-4 sm:mt-6"
          >
            Create Account
          </button>

        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-400">Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
