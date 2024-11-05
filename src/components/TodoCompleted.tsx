import { useTodosStore } from '@/store'
import { Button } from './ui/button'

export default function TodoCompleted({
  id,
  completed,
}: {
  id: string
  completed: boolean
}) {
  const { toggleCompleted } = useTodosStore()
  return (
    <Button
      variant={completed ? 'completed' : 'uncompleted'}
      size={'icon'}
      onClick={(e) => {
        e.stopPropagation()
        toggleCompleted(id)
      }}
    >
      <img src='/check.svg' width={20} height={20} />
    </Button>
  )
}
