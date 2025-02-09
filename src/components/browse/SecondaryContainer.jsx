import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return movies && (
    <div className='pl-6 pr-2 pb-6 flex flex-col gap-4 -mt-48 relative z-30 bg-gradient-to-b from-transparent via-black to-black from-[0%] via-[10%] to-100%'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MovieList title={"Upcoming"} movies={movies.upComingMovies} />
    </div>
  );
}

export default SecondaryContainer