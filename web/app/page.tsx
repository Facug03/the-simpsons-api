import { Hero } from '@/sections/hero'
import { ApiOverview } from '@/sections/api-overview'
import { Documentation } from '@/sections/documentation'
import { getCharacters } from '@/services/characters'
import { getEpisodes } from '@/services/episodes'
import { getLocations } from '@/services/locations'
import { PopularCharacters } from '@/sections/popular-characters'
import { ScrollTracker } from '@/components/scroll-tracker'

export default async function Home() {
  const [[charactersError, characters], [episodesError, episodes], [locationsError, locations]] = await Promise.all([
    getCharacters(),
    getEpisodes(),
    getLocations()
  ])

  if (charactersError) {
    throw charactersError
  }

  if (episodesError) {
    throw episodesError
  }

  if (locationsError) {
    throw locationsError
  }

  return (
    <ScrollTracker thresholds={[25, 50, 75, 100]} debounceMs={500}>
      <main className='divide-y bg-sky-50'>
        <Hero />
        <ApiOverview characters={characters} episodes={episodes} locations={locations} />
        <Documentation characters={characters} episodes={episodes} locations={locations} />
        <PopularCharacters characters={characters} />
      </main>
    </ScrollTracker>
  )
}
