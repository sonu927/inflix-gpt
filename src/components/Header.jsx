import { onAuthStateChanged, signOut } from "firebase/auth";
import InflixGptLogo from "./InflixGptLogo"
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled,setIsScrolled] = useState(false);
  const user = useSelector((store) => store.user);
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
  return (
    <div className={`fixed px-[8%] flex justify-between items-center w-[100%] z-50 ${isScrolled ? "bg-black shadow-md" : "bg-linear-to-b/increasing from-black" }`}>
        <InflixGptLogo />
        {user && 
          <div className="flex items-center rounded-sm text-white">
              <div className="flex items-center gap-1 p-2 align-middle rounded-tl-sm rounded-bl-sm">
                <span className="ri-user-6-fill text-xl"></span>
                <span className="text-ls">{user?.displayName}</span>
              </div>
              <div className="h-[40px] bg-gradient-to-b from-transparent via-white to-transparent w-[1.5px] rounded-full"></div>
              <span className="ri-logout-box-r-line text-2xl text-white p-2 rounded-tr-sm rounded-br-sm leading-none" onClick={handleSignOut}></span>
          </div>
        }
    </div>
  )
}

export default Header