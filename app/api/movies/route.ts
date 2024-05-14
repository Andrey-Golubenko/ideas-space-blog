import { NextResponse } from 'next/server'

// this is the test function, and we can see its result in POSTMAN

export async function GET(request: Request) {
  const API_KEY = process.env.OMDB_SECRET

  const query = 'matrix'

  const fetchedMovies = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  )

  const movies = await fetchedMovies.json()

  return NextResponse.json(movies)
}
