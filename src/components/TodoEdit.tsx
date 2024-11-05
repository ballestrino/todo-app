import { Todo, useTodosStore } from '@/store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import TodoCompleted from './TodoCompleted'

interface Props {
  todo: Todo
  inputRef: React.RefObject<HTMLInputElement>
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoEdit({ todo, inputRef, setEdit }: Props) {
  const { editTodo } = useTodosStore()

  const [newText, setNewText] = useState<string>(todo.text)

  const handleEditTodo = () => {
    if (newText) {
      editTodo(todo.id, newText)
      setEdit(false)
    }
  }
  return (
    <div
      className='flex w-full gap-3'
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className='flex w-full items-center gap-3'>
        <TodoCompleted id={todo.id} completed={todo.completed} />
        <Input
          ref={inputRef}
          className='border-none text-black' // Add the custom class
          value={newText}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditTodo()
          }}
          onChange={(e) => setNewText(e.target.value)}
        />
      </div>

      <div className='flex gap-2'>
        <Button size={'icon'} onClick={() => setEdit(false)}>
          <img src='/x.svg' />
        </Button>
        <Button
          size={'icon'}
          className='bg-green-400 hover:bg-green-400/80'
          onClick={handleEditTodo}
        >
          <img src='/check.svg' />
        </Button>
      </div>
    </div>
  )
}
