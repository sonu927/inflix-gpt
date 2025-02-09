import { useSelector } from 'react-redux'
import useMovieTrailer from '../../hooks/useMovieTrailer';

const VideoBackground = ({movieId}) => {
  const trailer = useSelector((store) => store.movies?.movieTrailer);
  useMovieTrailer(movieId);
  console.log(movieId)
  return (
    <div className='w-full'>
      <iframe className='w-full aspect-video' 
      src={`https://www.youtube.com/embed/${trailer?.key}?si=UX2e0OQmpFL4uEqu&amp;controls=0&autoplay=1&mute=1&loop=1&playlist=${trailer?.key}`}
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin"></iframe>
    </div>
  )
}

export default VideoBackground