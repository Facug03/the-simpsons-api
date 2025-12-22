import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about The Simpsons API, the technologies used, and data attribution.'
}

export default function AboutPage() {
  return (
    <main className='py-12 bg-sky-50 flex flex-col'>
      <div className='max-w-4xl mx-auto space-y-16'>
        <section className='space-y-8'>
          <h1 className='text-3xl font-bold text-center mb-6'>About</h1>
          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <h3 className='font-bold text-lg mb-2 text-sky-700'>Why The Simpsons API?</h3>
              <p className='text-gray-600'>
                I built this project to practice my backend skills and learn more about AWS and as a huge Simpsons fan,
                I realized there wasn't a dedicated API for the show, so I decided to create one myself.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <h3 className='font-bold text-lg mb-4 text-sky-700'>Technologies</h3>
              <p className='text-gray-600 mb-6'>
                The API was originally written in NestJS, but I switched to Hono to deploy it on AWS Lambda and reduce
                costs. The website is built with Next.js and Tailwind CSS, exported as a static site, and hosted on an
                S3 bucket served via CloudFront. For the database, I am using PostgreSQL.
              </p>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                <div className='space-y-2'>
                  <p className='text-3xl font-bold text-gray-900'>Hono</p>
                  <p className='text-sm text-gray-500'>API</p>
                </div>
                <div className='space-y-2'>
                  <p className='text-3xl font-bold text-gray-900'>Next.js</p>
                  <p className='text-sm text-gray-500'>Frontend</p>
                </div>
                <div className='space-y-2'>
                  <p className='text-3xl font-bold text-gray-900'>PostgreSQL</p>
                  <p className='text-sm text-gray-500'>Database</p>
                </div>
                <div className='space-y-2'>
                  <p className='text-3xl font-bold text-gray-900'>AWS</p>
                  <p className='text-sm text-gray-500'>S3 + CloudFront</p>
                </div>
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <h3 className='font-bold text-lg mb-2 text-sky-700'>Data Attribution</h3>
              <p className='text-gray-600'>
                This project uses data from{' '}
                <Link
                  href='https://simpsons.fandom.com/wiki/Simpsons_Wiki'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sky-600 hover:underline'
                >
                  The Simpsons Wiki
                </Link>{' '}
                under the Creative Commons Attribution-ShareAlike License (CC BY-SA).
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
