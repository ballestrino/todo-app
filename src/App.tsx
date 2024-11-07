import TodoContainer from './components/TodoContainer'
import InputTodo from './components/InputTodo'
import TodoOptions from './components/TodoOptions'
import ClearAll from './components/ClearAll'

export default function App() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-slate-800 px-5 py-10'>
      <div className='flex h-full min-h-[700px] w-full flex-col gap-5 rounded-md bg-slate-300 px-3 py-5 shadow-md md:w-4/5 md:p-10 lg:w-3/5 xl:w-1/2'>
        <h1 className='text-center text-3xl font-semibold text-slate-600'>
          TODO APP
        </h1>
        <p className='text-balance text-center text-slate-600'>
          Believe in yourself and anything is possible
        </p>
        <InputTodo />
        <TodoOptions />
        <TodoContainer />
        <ClearAll />
      </div>
    </div>
  )
}
