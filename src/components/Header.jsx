import { onAuthStateChanged, signOut } from "firebase/auth";
import InflixGptLogo from "./InflixGptLogo"
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleShowSearch } from "../utils/aiSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled,setIsScrolled] = useState(false);
  const user = useSelector((store) => store.user);
  const showAiSearch = useSelector((store) => store.ai.showSearchPage);
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error');
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({uid,email,displayName}));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    return () => unsubscribe();
  },[])

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50){
        setIsScrolled(true);
      }else{
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll',handleScroll);
    return () => {window.removeEventListener('scroll',handleScroll)}
  },[])

  const handleSearchClick = () => {
    dispatch(toggleShowSearch());
  }
  return (
    <div className={`fixed px-[8%] flex justify-between items-center w-[100%] z-50 ${isScrolled ? "bg-black shadow-md" : "bg-linear-to-b/increasing from-black" }`}>
        <InflixGptLogo />
        {user && 
          <div className="flex gap-2">
            <div className="box relative w-[50px] md:w-[140px] h-[48px] flex justify-center items-center text-white rounded-md overflow-hidden cursor-pointer" onClick={handleSearchClick}>
              <div className=" bg-black w-[90%] flex items-center justify-center py-2 px-2 rounded-md text-center">
              {showAiSearch? 
                <>
                 <span className="ri-home-9-line text-xl mr-0 md:mr-2"></span>
                 <span className="tracking-wide hidden md:inline-block">Home</span>
                </>
                :
                <>
                  <span className="ri-openai-line text-xl mr-0 md:mr-2"></span>
                  <span className="tracking-wide hidden md:inline-block">Search</span>
                </>
              }
              </div>
            </div>
            <div className="flex items-center rounded-sm text-white">
                <div className="flex items-center gap-1 p-2 align-middle rounded-tl-sm rounded-bl-sm">
                  <span className="ri-user-6-fill text-xl hidden md:inline-block"></span>
                  <span className="text-ls hidden md:inline-block">{user?.displayName}</span>
                  <span className="text-ls uppercase md:hidden inline-block" title={user?.displayName}>{user?.displayName?.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div className="h-[40px] bg-gradient-to-b from-transparent via-white to-transparent w-[1.5px] rounded-full"></div>
                <span className="ri-logout-box-r-line text-2xl text-white p-2 rounded-tr-sm rounded-br-sm leading-none" onClick={handleSignOut}></span>
            </div>
          </div>
        }
    </div>
  )
}

export default Header