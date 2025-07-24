import { ImageIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ApiUrlDisplay } from '@/components/api-url-display'
import { ExampleUrlDisplay } from '@/components/example-url-display'

export function Images() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ImageIcon className='h-5 w-5' />
          CDN Images
        </CardTitle>
        <CardDescription>How to use images from our high-performance CDN</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h4 className='font-semibold mb-2'>Image URL Pattern:</h4>
          <ApiUrlDisplay url='https://cdn.thesimpsonsapi.com/{size}{image_path}' showButtons={false} />
          <p className='text-sm text-gray-600 mt-2'>
            All images are served through our CDN for optimal performance and reliability.
          </p>
        </div>

        <div>
          <h4 className='font-semibold mb-2'>Available Sizes:</h4>
          <div className='flex gap-2 mb-2'>
            <Badge variant='outline'>200px</Badge>
            <Badge variant='outline'>500px</Badge>
            <Badge variant='outline'>1280px</Badge>
          </div>
          <p className='text-sm text-gray-600'>
            Choose the appropriate size based on your use case to optimize loading times.
          </p>
        </div>

        <div>
          <h4 className='font-semibold mb-2'>Examples:</h4>
          <div className='space-y-3'>
            <ExampleUrlDisplay
              url='https://cdn.thesimpsonsapi.com/500/character/1.webp'
              description='Character Portrait (500px) - Perfect for profile cards'
            />
            <ExampleUrlDisplay
              url='https://cdn.thesimpsonsapi.com/200/episode/1.webp'
              description='Episode Thumbnail (200px) - Ideal for lists and grids'
            />
            <ExampleUrlDisplay
              url='https://cdn.thesimpsonsapi.com/1280/location/1.webp'
              description='Location Image (1280px) - High resolution for detailed views'
            />
          </div>
        </div>

        <div className='bg-yellow-50 p-4 rounded-lg'>
          <h4 className='font-semibold text-yellow-900 mb-2'>🖼️ Image Best Practices</h4>
          <ul className='text-sm text-yellow-800 space-y-1'>
            <li>• Choose the smallest size that meets your design requirements</li>
            <li>• Implement lazy loading for better page performance</li>
            <li>• Add appropriate alt text for accessibility</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
