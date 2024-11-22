import React from 'react'
import { useTodosStore } from '@/zustand/store'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import TodoBox from './TodoBox'

const TodoContainer: React.FC = () => {
  const { todos, setTodos } = useTodosStore()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id)
      const newIndex = todos.findIndex((todo) => todo.id === over.id)

      const newTodos = arrayMove(todos, oldIndex, newIndex)

      setTodos(newTodos)
    }
  }

  if (todos.length === 0)
    return (
      <div className='flex h-full w-full items-center justify-center text-balance pt-32 text-center font-medium'>
        Create a new task to start planning your day
      </div>
    )

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext items={todos}>
        <div className='flex h-full flex-col gap-3'>
          {todos.map((todo) => (
            <TodoBox key={todo.id} todo={todo} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default TodoContainer
