import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useTodosStore } from '@/zustand/store'

export default function InputTodo() {
  const [value, setValue] = useState('')

  const { addTodo } = useTodosStore()

  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value) {
      if (value.length > 50) {
        setError('Max 50 characters')
        return
      }
      addTodo(value)
      setValue('')
      setError('')
    }
    return
  }
  return (
    <form
      className='relative flex gap-2 rounded-lg bg-slate-600 p-2'
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        placeholder='Escribe algo'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-white text-black'
      />
      <Button type='submit'>Add Todo</Button>
      <p className='absolute -top-6 text-red-400'>{error}</p>
    </form>
  )
}
