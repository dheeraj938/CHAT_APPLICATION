import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import useThemeBackground from '../hooks/useThemeBackground'

const HomePage = () => {
  const themeStyle = useThemeBackground()

  return (
    <div className={`flex flex-col lg:flex-row h-screen lg:h-[85vh] md:h-screen rounded-lg sm:rounded-xl lg:rounded-3xl overflow-hidden bg-gradient-to-br ${themeStyle.containerFrom} ${themeStyle.containerVia} ${themeStyle.containerTo} shadow-2xl border border-slate-700/50 backdrop-blur-xl w-full max-w-7xl mx-auto`}>
      <Sidebar />
      <MessageContainer/>
    </div>
  )
}

export default HomePage
