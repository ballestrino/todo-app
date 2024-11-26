import TodoContainer from './components/TodoContainer'
import InputTodo from './components/InputTodo'
import TodoOptions from './components/TodoOptions'
import ClearAll from './components/ClearAll'
import { Button } from './components/ui/button'
import { useThemeStore } from './zustand/theme'

export default function App() {
  const { theme, toggleTheme } = useThemeStore()
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-slate-800 px-2 py-10 sm:px-5'>
      <div className='relative flex h-full min-h-[700px] w-full flex-col gap-5 rounded-md bg-slate-300 px-3 py-5 shadow-md dark:bg-slate-900 md:w-4/5 md:p-10 lg:w-3/5 xl:w-1/2'>
        <h1 className='text-center text-3xl font-semibold text-slate-600 dark:text-white'>
          TODO APP
        </h1>
        <p className='text-balance text-center font-medium text-slate-600 dark:text-white'>
          Believe in yourself and anything is possible
        </p>
        <InputTodo />
        <TodoOptions />
        <TodoContainer />
        <ClearAll />
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={toggleTheme}
          className='absolute left-5 top-5'
        >
          <img
            width={20}
            height={20}
            src={theme !== 'dark' ? '/brightness-high.svg' : '/moon-fill.svg'}
          />
        </Button>
      </div>
    </div>
  )
}
