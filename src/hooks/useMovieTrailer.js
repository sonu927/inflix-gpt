import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addMovieTrailer } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json();
        const trailers = json?.results.filter((movie) => movie?.type == "Trailer");
        let mainTrailer = trailers?.length > 0 ? trailers[0] : json?.results?.[0];
        dispatch(addMovieTrailer(mainTrailer))
    }
    useEffect(() => {
        getMovieVideo();
    },[])
}

export default useMovieTrailer