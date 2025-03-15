import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const AiResultContainer = ({loading}) => {
  const aiSuggestedMovies = useSelector((store) => store.ai?.aiSuggestionMovies);


  if(loading){
    return (
      <div className='pb-12 flex justify-center items-center'>
        <div className='py-6 px-4 bg-custom-dark w-[75%] rounded-lg flex flex-col gap-1 text-white'>
          <div className='h-10 mb-2 animate-pulse rounded-md bg-gray-200 text-white w-[50%]'></div>
          <div className='flex overflow-x-scroll scrollbar-hide'>
              <div className='flex gap-2'>
                  {
                    Array.from({length:5}).map((_,index) =>
                      <div className='w-56 h-32 animate-pulse rounded-lg bg-gray-400' key={index}>
                      </div>
                    )
                  }
              </div>
          </div>
        </div>
      </div>
    )
  }
  if(!aiSuggestedMovies || aiSuggestedMovies?.length <=0) return null;
  console.log("dsklslkks",loading)
  return (
    <div className='pb-12 flex justify-center items-center'>
      <div className='py-6 px-4 bg-custom-dark w-[75%] rounded-lg flex flex-col gap-1 text-white'>
        <MovieList title={"Top 5 most relevant suggestions"} movies={aiSuggestedMovies} />
      </div>
    </div>
  )
}

export default AiResultContainer