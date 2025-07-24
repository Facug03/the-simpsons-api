import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EpisodePagination } from '@/types/api-the-simpsons/episode'
import { ApiUrlDisplay } from '@/components/api-url-display'
import { ExampleUrlDisplay } from '@/components/example-url-display'
import { JsonDisplay } from '@/components/json-display'

interface EpisodesProps {
  episodes: EpisodePagination
}

export function Episodes({ episodes }: EpisodesProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Badge variant='default'>GET</Badge>
            /api/episodes
          </CardTitle>
          <CardDescription>
            Access the complete catalog of The Simpsons episodes with detailed metadata
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api/episodes' />
          
          <div>
            <h4 className='font-semibold mb-3'>Query Parameters</h4>
            <div className='grid gap-3'>
              <div className='border rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Badge variant='outline'>page</Badge>
                  <span className='text-sm font-medium'>integer</span>
                  <Badge variant='secondary'>optional</Badge>
                </div>
                <p className='text-sm text-gray-600'>Page number for episode pagination. Each page contains exactly 20 episodes.</p>
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
                url='https://thesimpsonsapi.com/api/episodes'
                description='Get first 20 episodes (page 1)'
              />
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/episodes?page=10'
                description='Get episodes 181-200 (page 10)'
              />
              <ExampleUrlDisplay
                url='https://thesimpsonsapi.com/api/episodes?page=25'
                description='Get episodes 481-500 (page 25)'
              />
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-3'>Response Structure</h4>
            <JsonDisplay data={{ ...episodes, results: episodes.results.slice(0, 1) }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Badge variant='default'>GET</Badge>
            /api/episodes/:id
          </CardTitle>
          <CardDescription>
            Retrieve detailed information about a specific episode including air date, season, and synopsis
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ApiUrlDisplay url='https://thesimpsonsapi.com/api/episodes/1' />
          
          <div>
            <h4 className='font-semibold mb-2'>Path Parameters</h4>
            <div className='border rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='outline'>id</Badge>
                <span className='text-sm font-medium'>integer</span>
                <Badge variant='destructive'>required</Badge>
              </div>
              <p className='text-sm text-gray-600'>
                Unique episode identifier. Episodes are numbered chronologically by air date.
              </p>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>Example Response</h4>
            <JsonDisplay data={episodes.results[0]} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
