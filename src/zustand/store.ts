import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { Todo } from '../../types'

type TodosStore = {
  todos: Todo[]
  filter: 'all' | 'completed' | 'pending'
  addTodo: (todo: string) => void
  editTodo: (id: string, newText: string) => void
  removeTodo: (id: string) => void
  setTodos: (todos: Todo[]) => void
  toggleCompleted: (id: string) => void
  clearCompleted: () => void
  getAllTodos: () => void
  getCompletedTodos: () => void
  getPendingTodos: () => void
}

const getLocalTodos = () => {
  const todos =
    JSON.parse(window.localStorage.getItem('todos') as string) || null
  return todos as Todo[]
}

const setLocalTodos = (todos: Todo[]) => {
  try {
    window.localStorage.setItem('todos', JSON.stringify(todos))
  } catch (error) {
    console.log(error)
  }
}

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: getLocalTodos() || [],
  filter: 'all',
  addTodo: (todo: string) => {
    const todos = getLocalTodos() || []
    const newTodos = [...todos, { id: uuid(), text: todo, completed: false }]
    setLocalTodos(newTodos)
    set({ todos: newTodos })
  },
  editTodo: (id: string, newText: string) => {
    const todos = getLocalTodos() || []
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, text: newText }
      }
      return t
    })
    setLocalTodos(newTodos)
    set({ todos: newTodos })
  },
  toggleCompleted: (id: string) => {
    const todos = get().todos
    const localTodos = getLocalTodos() || []
    const newTodos = todos
      .map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed }
        }
        return t
      })
      .filter((t) => {
        if (get().filter === 'pending' && t.id === id && t.completed) {
          return false
        }
        if (get().filter === 'completed' && t.id === id && !t.completed) {
          return false
        }
        return true
      })
    const newLocalTodos = localTodos.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed }
      }
      return t
    })
    setLocalTodos(newLocalTodos)
    set({ todos: newTodos })
  },
  removeTodo: (id: string) => {
    const todos = get().todos
    const localTodos = getLocalTodos() || []
    const newTodos = todos.filter((t) => t.id !== id)
    const newLocalTodos = localTodos.filter((t) => t.id !== id)
    setLocalTodos(newLocalTodos)
    set({ todos: newTodos })
  },

  setTodos: (todos: Todo[]) => {
    if (get().filter === 'all') {
      setLocalTodos(todos)
    }
    set({ todos })
  },
  clearCompleted: () => {
    const todos = getLocalTodos() || []
    const newTodos = todos.filter((t) => !t.completed)
    setLocalTodos(newTodos)
    if (get().filter === 'completed') {
      set({ todos: [] })
      return
    }
    set({ todos: newTodos })
  },
  getAllTodos: () => {
    const todos = getLocalTodos() || []
    set({ todos: todos, filter: 'all' })
  },
  getCompletedTodos: () => {
    const todos = getLocalTodos() || []
    const completedTodos = todos.filter((t) => t.completed)
    set({ todos: completedTodos, filter: 'completed' })
  },
  getPendingTodos: () => {
    const todos = getLocalTodos() || []
    const pendingTodos = todos.filter((t) => !t.completed)
    set({ todos: pendingTodos, filter: 'pending' })
  },
}))
