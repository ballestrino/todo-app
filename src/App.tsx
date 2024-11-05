import TodoContainer from './components/TodoContainer'
import InputTodo from './components/InputTodo'

export default function App() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-slate-800 px-5 py-10'>
      <div className='flex h-full min-h-[500px] w-full flex-col gap-5 rounded-md bg-slate-300 px-3 py-5 md:w-3/4 md:p-10 lg:w-1/2'>
        <InputTodo />
        <TodoContainer />
      </div>
    </div>
  )
}
