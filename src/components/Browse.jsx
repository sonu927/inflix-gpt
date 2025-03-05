import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./browse/MainContainer";
import SecondaryContainer from "./browse/SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopratedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import { useSelector } from "react-redux";
import AiSearch from "./browse/AiSearch";

const Browse = () => {
  const showAiSearch = useSelector(store => store.ai.showSearchPage);
  useNowPlayingMovies();
  usePopularMovies();
  useTopratedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {showAiSearch ? 
        <AiSearch />
      : 
        <>
        <MainContainer />
        <SecondaryContainer />
        </>
      }
    </div>
  )
}

export default Browse