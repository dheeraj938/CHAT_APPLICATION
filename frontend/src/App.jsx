import React from 'react'
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import useGetAuthUser from "./hooks/useGetAuthUser";
import useThemeBackground from "./hooks/useThemeBackground";
import ThemeSelector from "./components/ThemeSelector";
import { useSelector } from "react-redux";


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<HomePage/>} />
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path: "/login",
    element:<Login/>
  },
])

const App = () => {
  useGetAuthUser()
  const themeStyle = useThemeBackground()
  const { authUser } = useSelector(store => store.user)

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 ${themeStyle.bgClass}`} 
         style={{
           backgroundAttachment: 'fixed'
         }}>
      <RouterProvider router={router}/>
      {authUser && <ThemeSelector />}
    </div>
  )
}

export default App
