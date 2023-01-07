import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "../firebase";

function SignUpScreen({ setSignUp }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        toast.success("Signned In Successfully");
        console.log(authUser);
      })
      .catch((error) => {
        toast.error("Cannot Sign You In");
        alert(error.message);
      });
  };
  return (
    <div className="bg-black bg-opacity-60 rounded-lg p-5 my-auto">
      <Toaster />
      <h1 className="text-center mb-4 text-white text-2xl">Sign In</h1>
      <form
        action=""
        className="flex flex-col justify-center space-y-5 w-[40vw]"
      >
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="px-3 py-2 rounded-md"
          required
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="px-3 py-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-900 text-white"
          onClick={signIn}
        >
          Sign In
        </button>
      </form>
      <h4 className="mt-4 text-center text-white text-sm">OR</h4>
      <div
        className="text-center text-white underline underline-offset-2 cursor-pointer text-lg"
        onClick={setSignUp}
      >
        Sign Up
      </div>
    </div>
  );
}

export default SignUpScreen;
