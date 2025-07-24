import { Database } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JsonDisplay } from '@/components/json-display'

export function Pagination() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Database className='h-5 w-5' />
          Understanding Pagination
        </CardTitle>
        <CardDescription>
          Learn how to efficiently navigate through large datasets using pagination
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <h4 className='font-semibold mb-3'>How Pagination Works</h4>
          <p className='text-gray-600 mb-4'>
            All endpoints that return lists (/characters, /episodes, /locations) implement automatic pagination 
            to improve performance and make it easier to navigate through large amounts of data. Each page contains exactly 20 items.
          </p>
        </div>

        <div>
          <h4 className='font-semibold mb-3'>Query Parameters</h4>
          <div className='grid gap-4'>
            <div className='border rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='default'>page</Badge>
                <span className='text-sm font-medium'>Page number</span>
              </div>
              <p className='text-sm text-gray-600 mb-2'>Specifies which page of results to retrieve.</p>
              <div className='bg-gray-50 p-2 rounded text-sm'>
                <strong>Default value:</strong> 1<br/>
                <strong>Valid range:</strong> 1 to total number of pages<br/>
                <strong>Items per page:</strong> 20 (fixed, cannot be changed)
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className='font-semibold mb-3'>Response Metadata</h4>
          <p className='text-gray-600 mb-3'>
            Every paginated response includes an <code>info</code> object with navigation metadata:
          </p>
          <JsonDisplay data={{
            info: {
              count: 826,
              pages: 42,
              next: "https://thesimpsonsapi.com/api/characters?page=2",
              prev: null
            }
          }} />
          <div className='mt-3 space-y-2 text-sm'>
            <div className='p-2 bg-gray-50 rounded'>
              <strong>count:</strong> Total number of items across all pages
            </div>
            <div className='p-2 bg-gray-50 rounded'>
              <strong>pages:</strong> Total number of pages available
            </div>
            <div className='p-2 bg-gray-50 rounded'>
              <strong>next:</strong> URL for the next page (null if on last page)
            </div>
            <div className='p-2 bg-gray-50 rounded'>
              <strong>prev:</strong> URL for the previous page (null if on first page)
            </div>
          </div>
        </div>

        <div className='bg-green-50 p-4 rounded-lg'>
          <h4 className='font-semibold text-green-900 mb-2'>💡 Navigation Tips</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Use the <code>next</code> and <code>prev</code> URLs for automatic navigation</li>
            <li>• Check <code>pages</code> to know the total number of pages available</li>
            <li>• Each page always contains exactly 20 items (this cannot be customized)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
