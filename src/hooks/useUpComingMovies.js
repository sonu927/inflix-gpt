import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUpComingMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useUpComingMovies = () => {
    const dispatch = useDispatch();
    const getUpComingMovies = async () => {
      let data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1',API_OPTIONS);
  
      const json = await data.json();
      console.log(json);
      dispatch(addUpComingMovies(json.results));
    }
    useEffect(() => {
        getUpComingMovies();
    },[])
}
export default useUpComingMovies;