import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function DeleteButton({
  onClick,
  position,
  className,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  position: 'left' | 'right' | 'top' | 'bottom'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className='relative z-10 flex'>
      <Button
        type='button'
        onClick={() => setOpen(true)}
        size={'icon'}
        variant={'destructive'}
      >
        <img src={'/trash.svg'} alt='eliminar producto' />
      </Button>
      {open && (
        <div
          className={cn(
            position === 'top' && 'bottom-12',
            position === 'bottom' && 'top-12',
            position === 'left' && 'right-12',
            position === 'right' && 'left-12',
            'absolute flex items-center justify-center',
            className,
          )}
        >
          <Button
            variant={'ghost'}
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button onClick={onClick}>Delete</Button>
        </div>
      )}
    </div>
  )
}
