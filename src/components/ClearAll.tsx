import { useTodosStore } from '@/zustand/store'
import { Button } from '@/components/ui/button'

export default function ClearAll() {
  const { todos, setTodos } = useTodosStore()
  if (todos.length === 0) return null
  return (
    <div className='flex w-full items-center justify-center'>
      <Button variant={'link'} className='w-fit' onClick={() => setTodos([])}>
        Clear all
      </Button>
    </div>
  )
}
