import { useTodosStore } from '@/store'
import { Button } from './ui/button'

export default function ClearCompleted() {
  const { clearCompleted } = useTodosStore()

  return (
    <Button variant={'secondary'} onClick={clearCompleted}>
      Clear Completed
    </Button>
  )
}
