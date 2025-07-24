import { BookOpen } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ApiUrlDisplay } from '@/components/api-url-display'
import { ExampleUrlDisplay } from '@/components/example-url-display'
import { JsonDisplay } from '@/components/json-display'
import { Character } from '@/types/api-the-simpsons/character'

export function GettingStarted({ character }: { character: Character }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BookOpen className='h-5 w-5' />
          Quick Start Guide
        </CardTitle>
        <CardDescription>
          Get up and running with The Simpsons API in minutes. No authentication required.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <h4 className='font-semibold mb-3'>Base URL</h4>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api' showButtons={false} />
          <p className='text-sm text-gray-600 mt-2'>
            All API requests should be made to this base URL. The API is completely open and requires no authentication.
          </p>
        </div>

        <div>
          <h4 className='font-semibold mb-3'>Your First Request</h4>
          <p className='text-gray-600 mb-3'>Let's start by fetching a single character. Try this example:</p>
          <ExampleUrlDisplay 
            url={`https://thesimpsonsapi.com/api/characters/${character.id}`} 
            description={`Get ${character.name}`} 
          />
        </div>

        <div>
          <h4 className='font-semibold mb-3'>Response Format</h4>
          <p className='text-gray-600 mb-3'>All responses are returned in JSON format with consistent structure:</p>
          <JsonDisplay
            data={{
              id: character.id,
              age: character.age,
              birthdate: character.birthdate,
              gender: character.gender,
              name: character.name,
              occupation: character.occupation,
              portrait_path: character.portrait_path,
              phrases: character.phrases,
              status: character.status
            }}
          />
          <p className='text-xs text-gray-500 mt-2'>
            <strong>Note:</strong> This example shows the main fields. The actual response may include additional fields
            depending on the endpoint.
          </p>
        </div>

        <div className='bg-blue-50 p-4 rounded-lg'>
          <h4 className='font-semibold text-blue-900 mb-2'>💡 Pro Tips</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Images are served via CDN for optimal performance</li>
            <li>• Each page contains exactly 20 items (pagination cannot be customized)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
