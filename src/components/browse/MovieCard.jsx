import React from 'react'
import { IMG_CDN_URL } from '../../utils/constants'

const MovieCard = ({movie}) => {
  return (
    <div className='w-56'>
        <img 
            src={IMG_CDN_URL+movie?.backdrop_path}
            alt={movie?.original_title || "Movie"} />
    </div>
  )
}

export default MovieCard