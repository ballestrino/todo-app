import { useTodosStore } from '@/zustand/store'
import { Button } from '@/components/ui/button'

export default function ClearAll() {
  const { todos, setTodos } = useTodosStore()
  if (todos.length === 0) return null
  return (
    <Button variant={'link'} onClick={() => setTodos([])}>
      Clear all
    </Button>
  )
}
