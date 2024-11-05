import { useTodosStore, type Todo } from '@/store'
import { Button } from './ui/button'
import { useRef, useState } from 'react'
import TodoEdit from './TodoEdit'
import DeleteButton from './ui/deleteButton'
import TodoCompleted from './TodoCompleted'

export default function Todo({ todo }: { todo: Todo }) {
  const { removeTodo, toggleCompleted } = useTodosStore()
  const [edit, setEdit] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={`flex w-full items-center justify-between gap-2 rounded-lg bg-white px-5 py-2 ${todo.completed && 'opacity-80'} shadow-sm transition-all duration-300 hover:shadow-md`}
      onClick={() => {
        toggleCompleted(todo.id)
      }}
    >
      {!edit ? (
        <>
          <div className='flex items-center gap-3'>
            <TodoCompleted id={todo.id} completed={todo.completed} />
            <p className={`text-black ${todo.completed && 'line-through'}`}>
              {todo.text}
            </p>
          </div>

          <div
            className='flex gap-2'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Button
              size={'icon'}
              onClick={(e) => {
                e.stopPropagation()
                setEdit(true)
                setTimeout(() => inputRef.current?.focus(), 10)
              }}
            >
              <img src='/pencil.svg' />
            </Button>
            <DeleteButton
              onClick={() => removeTodo(todo.id)}
              position='bottom'
              className='rounded-lg bg-slate-100 p-1'
            />
          </div>
        </>
      ) : (
        <TodoEdit todo={todo} inputRef={inputRef} setEdit={setEdit} />
      )}
    </div>
  )
}
