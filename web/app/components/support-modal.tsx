'use client'

import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components/ui/dialog'

export function SupportModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='rounded-full border-black h-8 w-8 sm:h-10 sm:w-10'
          data-umami-event='Header support'
        >
          <Coffee className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Support The Simpsons API</DialogTitle>
          <DialogDescription>If you enjoy using this API, consider supporting its development!</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3 py-4'>
          <Link
            href='https://buymeacoffee.com/thesimpsonsapi'
            target='_blank'
            rel='noopener noreferrer'
            data-umami-event='Support buymeacoffee'
          >
            <Button variant='outline' className='w-full justify-start gap-3 h-12'>
              <Coffee className='h-5 w-5 text-yellow-500' />
              <span>Buy Me a Coffee</span>
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
