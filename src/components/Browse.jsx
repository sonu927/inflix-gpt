import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./browse/MainContainer";
import SecondaryContainer from "./browse/SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopratedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopratedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  )
}

export default Browse