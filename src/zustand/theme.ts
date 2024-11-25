import { create } from 'zustand'
import Cookies from 'js-cookie'

type ThemeStore = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: (Cookies.get('theme') as 'light' | 'dark') || 'light',
  toggleTheme: () => {
    const theme = get().theme
    const body = document.querySelector('body')
    set(get().theme === 'light' ? { theme: 'dark' } : { theme: 'light' })
    if (body) {
      if (theme === 'dark') {
        body.classList.add('dark')
        Cookies.set('theme', 'dark', { expires: 7 })
      } else {
        body.classList.remove('dark')
        Cookies.set('theme', 'light', { expires: 7 })
      }
    }
  },
}))
