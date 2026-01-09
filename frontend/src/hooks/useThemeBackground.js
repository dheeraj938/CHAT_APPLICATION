import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../redux/themeSlice'

const useThemeBackground = () => {
  const dispatch = useDispatch()
  const { currentTheme } = useSelector(store => store.theme)

  const themeStyles = {
    midnight: {
      bgClass: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
      containerFrom: 'from-slate-900',
      containerVia: 'via-slate-800',
      containerTo: 'to-slate-900',
    },
    ocean: {
      bgClass: 'bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950',
      containerFrom: 'from-blue-900',
      containerVia: 'via-blue-800',
      containerTo: 'to-blue-900',
    },
    forest: {
      bgClass: 'bg-gradient-to-br from-green-950 via-green-900 to-green-950',
      containerFrom: 'from-green-900',
      containerVia: 'via-green-800',
      containerTo: 'to-green-900',
    },
    wine: {
      bgClass: 'bg-gradient-to-br from-red-950 via-red-900 to-red-950',
      containerFrom: 'from-red-900',
      containerVia: 'via-red-800',
      containerTo: 'to-red-900',
    }
  }

  useEffect(() => {
    dispatch(loadTheme())
  }, [dispatch])

  const getCurrentTheme = () => {
    return themeStyles[currentTheme] || themeStyles.midnight
  }

  return getCurrentTheme()
}

export default useThemeBackground
