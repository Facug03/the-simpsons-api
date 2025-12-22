import Image from 'next/image'
import Link from 'next/link'
import { Circle } from 'lucide-react'

export function Footer() {
  return (
    <footer className='bg-sky-50 py-12'>
      <div className='container mx-auto px-4'>
        <div className='text-center'>
          <div className='flex items-center justify-center mb-4'>
            <Image src='/logo.webp' alt='The Simpsons API Logo' width={200} height={24} />
          </div>
          <p className='text-gray-600 mb-6'>The RESTful API for The Simpsons universe</p>
          <div className='flex justify-center gap-x-6 gap-y-2 flex-wrap'>
            <Link
              href='https://thesimpsonsapi.com/api'
              target='_blank'
              className='text-gray-700 hover:text-gray-400'
              data-umami-event='Footer api endpoint'
            >
              API Endpoint
            </Link>
            <Link href='#docs' className='text-gray-700 hover:text-gray-400' data-umami-event='Footer documentation'>
              Documentation
            </Link>
            <Link href='#example' className='text-gray-700 hover:text-gray-400' data-umami-event='Footer example'>
              Example
            </Link>
            <Link
              href='https://status.thesimpsonsapi.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-700 hover:text-gray-400 flex items-center gap-2'
              data-umami-event='Footer status'
            >
              <Circle className='h-3 w-3 fill-green-500 text-green-500' />
              Status
            </Link>
          </div>
          <div className='pt-8 space-y-3'>
            <p className='text-gray-500 text-sm'>
              Built by{' '}
              <Link
                href='https://github.com/Facug03'
                target='_blank'
                className='text-gray-700 hover:text-gray-400 font-semibold underline'
                data-umami-event='Footer github'
              >
                FacuG03
              </Link>
            </p>
            <div className='text-gray-500 text-xs'>
              <p>
                This project uses data from{' '}
                <Link
                  href='https://simpsons.fandom.com/wiki/Simpsons_Wiki'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-gray-400 underline'
                  data-umami-event='Footer fandom'
                >
                  The Simpsons Wiki
                </Link>{' '}
                under the Creative Commons Attribution-ShareAlike License (CC BY-SA).
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
