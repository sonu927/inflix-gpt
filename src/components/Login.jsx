import { useState } from "react"
import Header from "./Header"

const Login = () => {
  const [isSignIn,setIsSignIn] = useState(true);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }
  return (
    <div className="relative bg-black h-[100vh] z-0">
        <div className="image-bg">
        </div>
        
        <Header />

        <form className="bg-black/70 text-white mx-auto mt-[6%] p-10 w-3/12 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{isSignIn ?"Sign In" : "Sign Up"}</h1>
          {!isSignIn && 
            <input 
              type="text"
              placeholder="Email Address"
              className="py-4 px-2 border border-gray-400 rounded-sm bg-gray-600/70"
            />
          }
          <input 
            type="text"
            placeholder="Email Address"
            className="py-4 px-2 border border-gray-400 rounded-sm bg-gray-600/70"
          />
          <input 
            type="password"
            placeholder="Password"
            className="py-4 px-2 border border-gray-400 rounded-sm bg-gray-600/70"
          />
          <button className="bg-red-600 rounded-sm py-2 px-2 text-lg">
            { isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <span className="text-gray-300 cursor-pointer" onClick={toggleSignInForm}>{isSignIn ? "New To Inflix?" : "Already a user?" }<span className="font-bold">{isSignIn ? " Sign Up Now" : " Sign In Now"}</span></span>
        </form>
    </div>
  )
}

export default Login