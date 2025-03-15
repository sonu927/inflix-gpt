import React from 'react'
import { IMG_CDN_URL } from '../../utils/constants'

const MovieCard = ({movie}) => {
  return (
    <div className='w-56 relative group' title={movie?.original_title}>
        <img 
            src={IMG_CDN_URL+movie?.backdrop_path}
            alt={movie?.original_title || "Movie"} />
        <div className='absolute bottom-0 flex flex-col gap-0.5 w-full h-1/2 items-start pl-4 pb-4 bg-gradient-to-b from-transparent to-black/80 opacity-100 transition-all duration-300 group-hover:opacity-100'>
            <span className='text-white font-semibold truncate leading-[18px] w-[100%]'>
                {movie?.original_title}
            </span>
            <span className='text-gray-200'>
                <span className='ri-star-smile-fill text-xl text-green-500 mr-1'></span>
                {movie?.vote_average ? movie.vote_average.toFixed(1) : "NA" }/10
            </span>
        </div>
    </div>
  )
}

export default MovieCard