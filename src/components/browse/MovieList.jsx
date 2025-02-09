import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
  return (
    <>
        <h1 className='text-3xl mb-2 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll scrollbar-hide'>
            <div className='flex gap-2'>
                {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    </>
  )
}

export default MovieList