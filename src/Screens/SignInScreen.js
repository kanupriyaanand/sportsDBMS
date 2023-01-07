import React from "react";
import { useForm } from "react-hook-form";
import db, { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";

const SignInScreen = ({ setSignIn }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await createUserWithEmailAndPassword(auth, data.Email, data.password)
      .then(async (authUser) => {
        toast.success("User Created Successfully");
        try {
          const StudentDocRef = addDoc(collection(db, "studentUsers"), data);
          console.log(StudentDocRef);
        } catch (e) {
          console.log(e);
        }
        console.log(authUser);
        reset();
      })
      .catch((error) => {
        toast.error("Cant create user");
        alert(error.message);
      });
  };
  console.log(errors);

  return (
    <div className="bg-black bg-opacity-60 rounded-lg p-5 my-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center mb-4 text-white text-2xl">Sign Up</h1>
      <form
        className="flex flex-col justify-center space-y-5 w-[40vw]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="px-3 py-2 rounded-md"
          placeholder="First name"
          {...register("First_name", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          className="px-3 py-2 rounded-md"
          placeholder="Last name"
          {...register("Last_name", { required: true, maxLength: 100 })}
        />
        <input
          type="text"
          className="px-3 py-2 rounded-md"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          className="px-3 py-2 rounded-md"
          placeholder="Mobile number"
          {...register("Mobile_number", {
            required: true,
            minLength: 10,
            maxLength: 12,
          })}
        />
        <input
          type="text"
          className="px-3 py-2 rounded-md"
          placeholder="Username"
          {...register("Username", { required: true })}
        />
        <input
          className="px-3 py-2 rounded-md"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input
          className="px-3 py-2 rounded-md"
          type="undefined"
          placeholder="Semester"
          {...register("semester", { required: true })}
        />
        <input
          className="px-3 py-2 rounded-md"
          type="date"
          placeholder="Date of Birth"
          {...register("date_of_birth", { required: true })}
        />
        <input
          className="px-3 py-2 rounded-md"
          type="text"
          placeholder="Department"
          {...register("department", { required: true })}
        />
        <input
          className="px-3 py-2 rounded-md"
          type="text"
          placeholder="USN"
          {...register("USN", { required: true })}
        />
        <input
          className="px-3 py-2 rounded-md"
          type="email"
          placeholder="Counselor email"
          {...register("Counselor_email", { required: true })}
        />

        <button
          className="px-3 py-2 rounded-md bg-blue-900 text-white"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <h4 className="mt-4 text-center text-white text-sm">OR</h4>
      <div
        className="text-center text-white underline underline-offset-2 cursor-pointer text-lg"
        onClick={setSignIn}
      >
        Sign In
      </div>
    </div>
  );
};

export default SignInScreen;
