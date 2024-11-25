import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTodosStore } from '@/zustand/store'

export default function Filters() {
  const { getAllTodos, getCompletedTodos, getPendingTodos } = useTodosStore()

  const [selected, setSelected] = useState('all')
  return (
    <div className='flex rounded-lg bg-slate-100 dark:bg-slate-800'>
      <Button
        className={`${selected === 'all' && 'underline underline-offset-4'}`}
        variant={'ghost'}
        onClick={() => {
          setSelected('all')
          getAllTodos()
        }}
      >
        All
      </Button>
      <Button
        className={`${selected === 'pending' && 'underline underline-offset-4'}`}
        variant={'ghost'}
        onClick={() => {
          setSelected('pending')
          getPendingTodos()
        }}
      >
        Pending
      </Button>
      <Button
        className={`${selected === 'completed' && 'underline underline-offset-4'}`}
        variant={'ghost'}
        onClick={() => {
          setSelected('completed')
          getCompletedTodos()
        }}
      >
        Completed
      </Button>
    </div>
  )
}
