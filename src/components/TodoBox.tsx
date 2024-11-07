import { useTodosStore } from '@/store'
import { type Todo as TodoType } from '../../types'
import { memo, useRef, useState } from 'react'
import TodoEdit from './TodoEdit'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Todo from './Todo'

function TodoBox({ todo }: { todo: TodoType }) {
  const { toggleCompleted } = useTodosStore()
  const [edit, setEdit] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // prevent performance issues on drag
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex w-full items-center justify-between gap-2 rounded-lg bg-white px-5 py-2 ${todo.completed && 'opacity-80'} ${!isDragging && 'shadow-sm transition-all duration-300 hover:shadow-md'}`}
      onClick={() => {
        toggleCompleted(todo.id)
      }}
    >
      {!edit ? (
        <Todo
          todo={todo}
          inputRef={inputRef}
          attributes={attributes}
          listeners={listeners}
          setEdit={setEdit}
        />
      ) : (
        <TodoEdit
          todo={todo}
          inputRef={inputRef}
          attributes={attributes}
          listeners={listeners}
          setEdit={setEdit}
        />
      )}
    </div>
  )
}

export default memo(TodoBox)
