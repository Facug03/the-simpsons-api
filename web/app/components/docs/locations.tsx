import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LocationPagination } from '@/types/api-the-simpsons/location'
import { ApiUrlDisplay } from '@/components/api-url-display'
import { ExampleUrlDisplay } from '@/components/example-url-display'
import { JsonDisplay } from '@/components/json-display'

interface LocationsProps {
  locations: LocationPagination
}

export function Locations({ locations }: LocationsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Badge variant='default'>GET</Badge>
            /api/locations
          </CardTitle>
          <CardDescription>
            Explore iconic locations from Springfield and beyond with comprehensive location data
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api/locations' />
          
          <div>
            <h4 className='font-semibold mb-3'>Query Parameters</h4>
            <div className='grid gap-3'>
              <div className='border rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Badge variant='outline'>page</Badge>
                  <span className='text-sm font-medium'>integer</span>
                  <Badge variant='secondary'>optional</Badge>
                </div>
                <p className='text-sm text-gray-600'>Specify which page of locations to retrieve. Each page contains exactly 20 locations.</p>
                <div className='text-xs text-gray-500 mt-1'>
                  <strong>Default:</strong> 1
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Example Requests</h4>
            <div className='space-y-3'>
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/locations'
                description='Get first 20 locations (page 1)'
              />
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/locations?page=2'
                description='Get locations 21-40 (page 2)'
              />
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/locations?page=3'
                description='Get locations 41-60 (page 3)'
              />
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Response Format</h4>
            <JsonDisplay data={{ ...locations, results: locations.results.slice(0, 1) }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Badge variant='default'>GET</Badge>
            /api/locations/:id
          </CardTitle>
          <CardDescription>
            Get detailed information about a specific location by its unique ID
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api/locations/1' />
          
          <div>
            <h4 className='font-semibold mb-2'>Path Parameters</h4>
            <div className='border rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='outline'>id</Badge>
                <span className='text-sm font-medium'>integer</span>
                <Badge variant='destructive'>required</Badge>
              </div>
              <p className='text-sm text-gray-600'>
                The unique identifier of the location. Must be a positive integer.
              </p>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Example Response</h4>
            <JsonDisplay data={locations.results[0]} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
