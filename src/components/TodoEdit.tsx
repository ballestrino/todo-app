import { useTodosStore } from '@/zustand/store'
import { type Todo } from '../../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import TodoCompleted from './TodoCompleted'
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { type DraggableAttributes } from '@dnd-kit/core'

interface Props {
  todo: Todo
  inputRef: React.RefObject<HTMLInputElement>
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoEdit({
  todo,
  inputRef,
  attributes,
  listeners,
  setEdit,
}: Props) {
  const { editTodo } = useTodosStore()

  const [error, setError] = useState<string>('')
  const [newText, setNewText] = useState<string>(todo.text)

  const handleEditTodo = () => {
    if (newText) {
      if (newText.length > 50) {
        setError('Max 50 characters')
        return
      }
      editTodo(todo.id, newText)
      setEdit(false)
    }
  }
  return (
    <div
      className='relative flex w-full flex-col gap-2 md:h-[80px] md:flex-row'
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className='flex w-full'>
        <div className='flex w-full items-center gap-3'>
          <div className='flex'>
            <Button
              className='cursor-move'
              size={'icon'}
              variant={'ghost'}
              {...attributes}
              {...listeners}
            >
              <img src='/grip-vertical.svg' alt='drag item' />
            </Button>
            <TodoCompleted id={todo.id} completed={todo.completed} />
          </div>

          <Input
            ref={inputRef}
            className='hidden border-none text-black md:block' // Add the custom class
            value={newText}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditTodo()
            }}
            onChange={(e) => setNewText(e.target.value)}
          />
        </div>

        <div className='flex items-center gap-2'>
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
      <Input
        ref={inputRef}
        className='border-none text-black md:hidden' // Add the custom class
        value={newText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleEditTodo()
        }}
        onChange={(e) => setNewText(e.target.value)}
      />
      <p className='absolute bottom-5 left-3 text-red-400 md:-bottom-1 md:left-24'>
        {error}
      </p>
    </div>
  )
}
