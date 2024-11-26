import { create } from 'zustand'
import Cookies from 'js-cookie'

type ThemeStore = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const CookiesTheme = () => {
  const theme = Cookies.get('theme') as 'light' | 'dark' | undefined

  if (theme) {
    const body = document.querySelector('body')
    if (body) {
      if (theme === 'dark') {
        body.classList.add('dark')
        Cookies.set('theme', 'dark', { expires: 7 })
      } else {
        body.classList.remove('dark')
        Cookies.set('theme', 'light', { expires: 7 })
      }
    }
    return theme
  }
  return 'light'
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: CookiesTheme(),
  toggleTheme: () => {
    const theme = get().theme
    const body = document.querySelector('body')
    set(theme === 'light' ? { theme: 'dark' } : { theme: 'light' })
    if (body) {
      if (theme === 'dark') {
        body.classList.remove('dark')
        Cookies.set('theme', 'light', { expires: 7 })
      } else {
        body.classList.add('dark')
        Cookies.set('theme', 'dark', { expires: 7 })
      }
    }
  },
}))
