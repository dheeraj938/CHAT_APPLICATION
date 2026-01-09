import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../redux/themeSlice'
import { MdPalette } from 'react-icons/md'

const ThemeSelector = () => {
  const dispatch = useDispatch()
  const { currentTheme } = useSelector(store => store.theme)

  const themes = [
    {
      id: 'midnight',
      name: 'Midnight',
      bgFrom: 'from-slate-900',
      bgVia: 'via-slate-800',
      bgTo: 'to-slate-900',
      color: '#1e293b',
      dotColor: 'bg-slate-600'
    },
    {
      id: 'ocean',
      name: 'Ocean',
      bgFrom: 'from-blue-900',
      bgVia: 'via-blue-800',
      bgTo: 'to-blue-950',
      color: '#001f3f',
      dotColor: 'bg-blue-600'
    },
    {
      id: 'forest',
      name: 'Forest',
      bgFrom: 'from-green-900',
      bgVia: 'via-green-800',
      bgTo: 'to-green-950',
      color: '#0d2818',
      dotColor: 'bg-green-600'
    },
    {
      id: 'wine',
      name: 'Wine',
      bgFrom: 'from-red-900',
      bgVia: 'via-red-800',
      bgTo: 'to-red-950',
      color: '#3f0000',
      dotColor: 'bg-red-600'
    }
  ]

  const handleThemeChange = (themeId) => {
    dispatch(setTheme(themeId))
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 group">
      {/* Theme Selector Button */}
      <button
        className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-indigo-600/50 transition-all flex items-center justify-center group-hover:scale-110 duration-300"
        title="Change Theme"
      >
        <MdPalette size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Theme Options */}
      <div className="absolute bottom-16 sm:bottom-20 right-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-slate-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 space-y-2 sm:space-y-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm ${
              currentTheme === theme.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full ${theme.dotColor} border-2 border-white flex-shrink-0`} />
            <span className="font-semibold">{theme.name}</span>
            {currentTheme === theme.id && <span className="ml-auto">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector
