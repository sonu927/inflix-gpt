import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const AiResultContainer = () => {
  const aiSuggestedMovies = useSelector((store) => store.ai?.aiSuggestionMovies);

  if(!aiSuggestedMovies || aiSuggestedMovies?.length <=0) return null
  return (
    <div className='pb-12 flex justify-center items-center'>
      <div className='py-6 px-4 bg-custom-dark w-[75%] rounded-lg flex flex-col gap-1 text-white'>
        <MovieList title={"Top 5 most relevant suggestions"} movies={aiSuggestedMovies} />
      </div>
    </div>
  )
}

export default AiResultContainer