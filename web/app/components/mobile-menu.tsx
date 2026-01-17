'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Github } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <div className='sm:hidden'>
      <Button
        variant='outline'
        className='rounded-full border-black h-8 w-8'
        onClick={() => setIsOpen(!isOpen)}
        data-umami-event='Header menu toggle'
      >
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
        </span>
      </Button>

      <div
        className={`absolute top-full left-0 right-0 bg-sky-50 border-b shadow-lg !border-t-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
          <Link
            href='/#docs'
            className='hover:text-gray-500 text-base py-2 transition-colors'
            data-umami-event='Header documentation'
            onClick={closeMenu}
          >
            Docs
          </Link>
          <Link
            href='/about'
            className='hover:text-gray-500 text-base py-2 transition-colors'
            data-umami-event='Header about'
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href='/#example'
            className='hover:text-gray-500 text-base py-2 transition-colors'
            data-umami-event='Header example'
            onClick={closeMenu}
          >
            Example
          </Link>
          <Link
            href='https://github.com/Facug03/the-simpsons-api'
            target='_blank'
            className='flex items-center gap-2 hover:text-gray-500 text-base py-2 transition-colors'
            data-umami-event='Header github'
            onClick={closeMenu}
          >
            <Github className='h-4 w-4' />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}
