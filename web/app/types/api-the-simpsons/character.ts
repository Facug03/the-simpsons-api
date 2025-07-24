import { Episode } from './episode'

export interface Character {
  id: number
  age: number | null
  birthdate: string | null
  gender: string
  name: string
  occupation: string
  portrait_path: string
  phrases: string[]
  status: string
}

export interface Short {
  id: number
  airdate: string
  description: string
  episode_number: number
  image_path: string
  name: string
  season: number
  synopsis: string
}

export interface CharacterDetail {
  id: number
  age: number | null
  birthdate: string | null
  description: string
  first_appearance_ep_id: number | null
  first_appearance_sh_id: number | null
  gender: 'Male' | 'Female' | 'Unknown'
  name: string
  occupation: string
  phrases: string[]
  portrait_path: string
  status: string
  first_appearance_ep: Episode | null
  first_appearance_sh: Short | null
}

export interface CharacterPagination {
  count: number
  next: string | null
  prev: string | null
  pages: number
  results: Character[]
}
