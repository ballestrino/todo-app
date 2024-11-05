import TodoContainer from './components/TodoContainer'
import InputTodo from './components/ui/InputTodo'

export default function App() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-slate-800 p-10'>
      <div className='flex h-full min-h-[500px] w-full flex-col gap-5 bg-slate-300 p-10 md:w-3/4 lg:w-1/2'>
        <InputTodo />
        <TodoContainer />
      </div>
    </div>
  )
}
