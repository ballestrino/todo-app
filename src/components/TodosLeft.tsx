import { useTodosStore } from '@/store'
import { Button } from './ui/button'

export default function TodosLeft() {
  const { todos } = useTodosStore()
  const todosLeft = todos.filter((t) => !t.completed).length
  return (
    <Button className='cursor-default' variant={'secondary'}>
      {todosLeft} todos left
    </Button>
  )
}
