import { useTodosStore } from '@/store'
import { type Todo as TodoType } from '../../types'
import TodoCompleted from './TodoCompleted'
import { Button } from './ui/button'
import DeleteButton from './ui/deleteButton'
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { type DraggableAttributes } from '@dnd-kit/core'

interface TodoProps {
  todo: TodoType
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  inputRef: React.RefObject<HTMLInputElement>
  setEdit: (edit: boolean) => void
}

export default function Todo({
  todo,
  attributes,
  listeners,
  inputRef,
  setEdit,
}: TodoProps) {
  const { removeTodo } = useTodosStore()
  return (
    <div className='flex w-full flex-col gap-2 md:h-[80px] md:flex-row'>
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

          <p
            className={`hidden break-words text-black md:block ${todo.completed && 'text line-through'}`}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {todo.text}
          </p>
        </div>

        <div
          className='flex items-center gap-2'
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
      </div>

      <p
        className={`max-h-60[px] block overflow-auto text-black md:hidden ${todo.completed && 'text break-words line-through'}`}
      >
        {todo.text}
      </p>
    </div>
  )
}
