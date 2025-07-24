import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CharacterPagination, CharacterDetail } from '@/types/api-the-simpsons/character'
import { ApiUrlDisplay } from '@/components/api-url-display'
import { ExampleUrlDisplay } from '@/components/example-url-display'
import { JsonDisplay } from '@/components/json-display'

interface CharactersProps {
  characters: CharacterPagination
  characterDetail: CharacterDetail
}

export function Characters({ characters, characterDetail }: CharactersProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Badge variant='default'>GET</Badge>
            /api/characters
          </CardTitle>
          <CardDescription>Retrieve all characters from The Simpsons universe with pagination support</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api/characters' />

          <div>
            <h4 className='font-semibold mb-3'>Query Parameters</h4>
            <div className='space-y-3'>
              <div className='border rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Badge variant='outline'>page</Badge>
                  <span className='text-sm font-medium'>integer</span>
                  <Badge variant='secondary'>optional</Badge>
                </div>
                <p className='text-sm text-gray-600 mb-2'>
                  The page number to retrieve. Each page contains exactly 20 characters.
                </p>
                <div className='text-xs text-gray-500'>
                  <strong>Default:</strong> 1 | <strong>Range:</strong> 1 to total pages
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Example Requests</h4>
            <div className='space-y-3'>
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/characters'
                description='Get first 20 characters (page 1)'
              />
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/characters?page=2'
                description='Get characters 21-40 (page 2)'
              />
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/characters?page=5'
                description='Get characters 81-100 (page 5)'
              />
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Response Schema</h4>
            <JsonDisplay data={{ ...characters, results: characters.results.slice(0, 1) }} />
            <div className='mt-3 p-3 bg-gray-50 rounded-lg text-sm'>
              <p>
                <strong>info:</strong> Pagination metadata including total count, pages, and navigation URLs
              </p>
              <p>
                <strong>results:</strong> Array of character objects for the current page
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Badge variant='default'>GET</Badge>
            /api/characters/:id
          </CardTitle>
          <CardDescription>Get detailed information about a specific character by their unique ID</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api/characters/5' />

          <div>
            <h4 className='font-semibold mb-2'>Path Parameters</h4>
            <div className='border rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='outline'>id</Badge>
                <span className='text-sm font-medium'>integer</span>
                <Badge variant='destructive'>required</Badge>
              </div>
              <p className='text-sm text-gray-600'>
                The unique identifier of the character. Must be a positive integer.
              </p>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Example Response</h4>
            <JsonDisplay data={characterDetail} />
            <p className='text-xs text-gray-500 mt-2'>
              <strong>Note:</strong> Individual character responses include additional fields like description, first
              appearances, and related episode/short information.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
