import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

 const Login = () => {

   const [user, setUser] = useState({
     username: "",
     password: "",
   });
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

  const onSubmitHandler =async (e) => {
    e.preventDefault()
    setLoading(true);
     try {
    
     const res = await axios.post("http://localhost:8080/api/v1/user/login", user, {
       headers: {
         "Content-Type": "application/json"
        
       },
       withCredentials: true
     });
     
       console.log(res.data);
       dispatch(setAuthUser(res.data));
       toast.success("Login successful!");
       
       setUser({
         username: "",
         password: "",
       });

       navigate("/");
      
      

     } catch (error) {
       const message = error.response?.data?.message || error.message || 'Login failed. Please try again.';
       toast.error(message);
       console.log(error);
    
     } finally {
       setLoading(false);
     }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-700/50 backdrop-blur-xl">

        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">💬</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-1 sm:mb-2">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">Login to your chat account</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4 sm:space-y-5">

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              disabled={loading}
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              disabled={loading}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm sm:text-base rounded-lg sm:rounded-xl transition shadow-lg hover:shadow-indigo-600/50 mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-400">Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}
export default Login;



