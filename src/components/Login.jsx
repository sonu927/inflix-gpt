import { useState } from "react"
import Header from "./Header"
import * as Yup from "yup";
import { useFormik } from "formik";

const Login = () => {
  const [isSignIn,setIsSignIn] = useState(true);

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
        console.log("ldksd",values);
      }else{
        console.log("ldksd",values);
      }
    }
  })
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
    formik.resetForm();
  }
  return (
    <div className="relative bg-black h-[100vh] z-0">
        <div className="image-bg">
        </div>
        
        <Header />

        <form onSubmit={formik.handleSubmit} className="bg-black/70 text-white mx-auto mt-[6%] p-10 w-3/12 flex flex-col gap-4">
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
          <button type="submit" className="bg-red-600 rounded-sm py-2 px-2 text-lg">
            { isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <span className="text-gray-300 cursor-pointer" onClick={toggleSignInForm}>{isSignIn ? "New To Inflix?" : "Already a user?" }<span className="font-bold">{isSignIn ? " Sign Up Now" : " Sign In Now"}</span></span>
        </form>
    </div>
  )
}

export default Login