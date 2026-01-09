import React from 'react'
import { IoSend } from "react-icons/io5"
import { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addMessage } from '../redux/messageSlice'

const Sendinput = () => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { selectedUser, authUser } = useSelector(store => store.user)
  const dispatch = useDispatch()

  const handleTyping = (e) => {
    setMessage(e.target.value)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!message || message.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    if (!selectedUser?._id) {
      toast.error("Please select a user first");
      return;
    }

    setLoading(true);
    try {
      const messageId = Date.now().toString()
      const createdAt = new Date().toISOString()
      
      // Send via HTTP to save to database
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      console.log("Message sent:", res.data);
      
      // Add to local Redux state immediately
      dispatch(addMessage({
        senderId: authUser._id,
        receiverId: selectedUser._id,
        text: message,
        message: message,
        createdAt: createdAt,
        _id: messageId
      }));
      
      toast.success("Message sent!");
      setMessage("");
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to send message";
      console.log("Error:", errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-900 border-t border-slate-700/50 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3">
        <input
          value={message}
          onChange={handleTyping}
          disabled={loading}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 transition shadow-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="p-2.5 sm:p-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-full hover:shadow-lg hover:shadow-indigo-600/50 transition disabled:opacity-50 text-white font-semibold flex-shrink-0"
        >
          <IoSend className="text-lg sm:text-xl" />
        </button>
      </div>
    </form>
  )
}

export default Sendinput
