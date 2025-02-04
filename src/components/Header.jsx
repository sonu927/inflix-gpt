import { onAuthStateChanged, signOut } from "firebase/auth";
import InflixGptLogo from "./InflixGptLogo"
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  return (
    <div className="px-[8%] flex justify-between items-center bg-linear-to-b/increasing from-black ">
        <InflixGptLogo />
        {user && 
          <div className="flex items-center rounded-sm text-white">
              <span className="p-2 bg-gray-800 align-middle rounded-tl-sm rounded-bl-sm border-r-3 border-white">{user?.displayName}</span>
              <span className="ri-logout-box-r-line text-2xl bg-gray-800 text-white p-2 rounded-tr-sm rounded-br-sm leading-none" onClick={handleSignOut}></span>
          </div>
        }
    </div>
  )
}

export default Header