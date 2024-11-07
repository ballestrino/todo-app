import ClearCompleted from './ClearCompleted'
import Filters from './Filters'
import TodosLeft from './TodosLeft'

export default function TodoOptions() {
  return (
    <div className='flex flex-col items-center justify-between gap-5 sm:w-full sm:flex-row'>
      <div className='flex items-center gap-5'>
        <ClearCompleted />
        <TodosLeft />
      </div>

      <Filters />
    </div>
  )
}
