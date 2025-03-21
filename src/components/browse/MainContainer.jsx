import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if(!movies) return;
  const randomIndex = Math.floor(Math.random() * movies.length);
  const {id,original_title,overview} = movies[randomIndex]
  return (
    <div className='bg-black bg-gradient-to-r from-black pt-[10%] md:pt-0'>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer