import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CharacterPagination } from '@/types/api-the-simpsons/character'
import { EpisodePagination } from '@/types/api-the-simpsons/episode'
import { LocationPagination } from '@/types/api-the-simpsons/location'
import { GettingStarted } from '@/components/docs/getting-started'
import { Characters } from '@/components/docs/characters'
import { Episodes } from '@/components/docs/episodes'
import { Locations } from '@/components/docs/locations'
import { Pagination } from '@/components/docs/pagination'
import { Images } from '@/components/docs/images'
import { getCharacterById } from '@/services/characters'

const DEFAULT_CHARACTER_ID = 5

export async function Documentation({
  characters,
  episodes,
  locations
}: {
  characters: CharacterPagination
  episodes: EpisodePagination
  locations: LocationPagination
}) {
  const [characterDetailError, characterDetail] = await getCharacterById(DEFAULT_CHARACTER_ID)

  if (characterDetailError) {
    throw characterDetailError
  }

  return (
    <section id='docs' className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>API Documentation</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Complete reference guide for The Simpsons API. Get access to characters, episodes, locations, and images
            with simple REST endpoints.
          </p>
        </div>

        <div className='max-w-6xl mx-auto'>
          <Tabs defaultValue='getting-started' className='w-full'>
            <TabsList className='grid w-full grid-cols-6'>
              <TabsTrigger value='getting-started'>Getting Started</TabsTrigger>
              <TabsTrigger value='characters'>Characters</TabsTrigger>
              <TabsTrigger value='episodes'>Episodes</TabsTrigger>
              <TabsTrigger value='locations'>Locations</TabsTrigger>
              <TabsTrigger value='pagination'>Pagination</TabsTrigger>
              <TabsTrigger value='images'>Images</TabsTrigger>
            </TabsList>

            <TabsContent value='getting-started' className='space-y-6'>
              <GettingStarted character={characters.results[0]} />
            </TabsContent>

            <TabsContent value='characters' className='space-y-6'>
              <Characters characters={characters} characterDetail={characterDetail} />
            </TabsContent>

            <TabsContent value='episodes' className='space-y-6'>
              <Episodes episodes={episodes} />
            </TabsContent>

            <TabsContent value='locations' className='space-y-6'>
              <Locations locations={locations} />
            </TabsContent>

            <TabsContent value='pagination' className='space-y-6'>
              <Pagination />
            </TabsContent>

            <TabsContent value='images' className='space-y-6'>
              <Images />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
