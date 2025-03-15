import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
  return (
    <>
        <h1 className='text-lg md:text-3xl mb-2 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll md:scrollbar-hide'>
            <div className='flex gap-2'>
                {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    </>
  )
}

export default MovieList