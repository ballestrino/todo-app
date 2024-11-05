import React from 'react'
import { useTodosStore } from '../store'
import Todo from './Todo'

const TodoContainer: React.FC = () => {
  const { todos } = useTodosStore()

  return (
    <div className='flex flex-col gap-3'>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoContainer
