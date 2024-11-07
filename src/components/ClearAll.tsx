import { useTodosStore } from '@/store'
import { Button } from './ui/button'

export default function ClearAll() {
  const { todos, setTodos } = useTodosStore()
  if (todos.length === 0) return null
  return (
    <Button variant={'link'} onClick={() => setTodos([])}>
      Clear all
    </Button>
  )
}
