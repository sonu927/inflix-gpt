import { useState } from "react"
import Header from "./Header"
import * as Yup from "yup";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn,setIsSignIn] = useState(true);
  const [errorMsg,setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: isSignIn ? Yup.string() : Yup.string().min(3,"Name must be at least 3 Character"),
    email: Yup.string().email("Invalid Email format").required("Email is required"),
    password: Yup.string().min(6,"Password must contain at least 6 characters").required("Password is required")
  });

  const formik = useFormik({
    initialValues:{
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(isSignIn){
        handleSignIn(values.email,values.password);
      }else{
        handleSignUp(values.name,values.email,values.password);
      }
    }
  })
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
    formik.resetForm();
  }

  function handleSignUp(name,email,password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      updateProfile(user, {
        displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        const {uid,email,displayName} = auth.currentUser;
        dispatch(addUser({uid,email,displayName}));
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + " - " + errorMessage);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMsg(errorCode + " - " + errorMessage);
    });
  }

  function handleSignIn(email,password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMsg(errorCode + " - " + errorMessage);
    });
  }

  return (
    <div className="relative bg-black h-[100vh] z-0">
        <Header />
        <div className="image-bg">
        </div>
        <form onSubmit={formik.handleSubmit} className="bg-black/70 text-white md:mx-auto absolute left-[12%] md:left-[40%] top-[25%] p-10 w-9/12 md:w-3/12 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{isSignIn ?"Sign In" : "Sign Up"}</h1>
          {!isSignIn && 
            <>
              <input 
                type="text"
                name="name"
                placeholder="Full Name"
                className="py-4 px-2 border border-gray-400 rounded-sm bg-gray-600/70"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </>
          }
          <input 
            type="text"
            name="email"
            placeholder="Email Address"
            className="py-4 px-2 border border-gray-400 rounded-sm bg-gray-600/70"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          <input 
            type="password"
            name="password"
            placeholder="Password"
            className="py-4 px-2 border border-gray-400 rounded-sm bg-gray-600/70"
            value={formik.values.pasaword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
            {errorMsg && errorMsg?.length > 0 ? 
              <div className="text-red-500 text-sm">{errorMsg}</div>
            : null}
          <button type="submit" className="bg-red-600 rounded-sm py-2 px-2 text-lg cursor-pointer">
            { isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <span className="text-gray-300 cursor-pointer" onClick={toggleSignInForm}>{isSignIn ? "New To Inflix?" : "Already a user?" }<span className="font-bold">{isSignIn ? " Sign Up Now" : " Sign In Now"}</span></span>
        </form>
    </div>
  )
}

export default Login