import { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { useTodosStore } from '@/store'

export default function InputTodo() {
  const [value, setValue] = useState('')

  const { addTodo } = useTodosStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit')
    e.preventDefault()
    if (value) {
      addTodo(value)
      setValue('')
    }
    return
  }
  return (
    <form
      className='flex gap-2 rounded-lg bg-slate-600 p-2'
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        placeholder='Escribe algo'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-white'
      />
      <Button type='submit'>Add Todo</Button>
    </form>
  )
}
