import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

type TodosStore = {
  todos: Todo[]
  addTodo: (todo: string) => void
  getTodos: () => void
  editTodo: (id: string, newText: string) => void
  removeTodo: (id: string) => void
  setTodos: (todos: Todo[]) => void
  toggleCompleted: (id: string) => void
}

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: JSON.parse(window.localStorage.getItem('todos')) || [],
  addTodo: (todo: string) => {
    const todos = get().todos
    const newTodos = [...todos, { id: uuid(), text: todo, completed: false }]
    try {
      window.localStorage.setItem('todos', JSON.stringify(newTodos))
    } catch (error) {
      console.log(error)
      return
    }
    set({ todos: newTodos })
  },
  getTodos: () => {
    try {
      const todos = window.localStorage.getItem('todos')
      if (todos) {
        set({ todos: JSON.parse(todos) })
      }
    } catch (error) {
      console.log(error)
      return
    }
  },
  editTodo: (id: string, newText: string) => {
    const todos = get().todos
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, text: newText }
      }
      return t
    })
    try {
      window.localStorage.setItem('todos', JSON.stringify(newTodos))
    } catch (error) {
      console.log(error)
    }
    set({ todos: newTodos })
  },
  toggleCompleted: (id: string) => {
    const todos = get().todos
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed }
      }
      return t
    })
    try {
      window.localStorage.setItem('todos', JSON.stringify(newTodos))
    } catch (error) {
      console.log(error)
    }
    set({ todos: newTodos })
  },
  removeTodo: (id: string) => {
    const todos = get().todos
    const newTodos = todos.filter((t) => t.id !== id)
    try {
      window.localStorage.setItem('todos', JSON.stringify(newTodos))
    } catch (error) {
      console.log(error)
      return
    }
    set({ todos: newTodos })
  },

  setTodos: (todos: Todo[]) => {
    set({ todos })
  },
}))
