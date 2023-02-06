import React from "react";
import { useForm } from "react-hook-form";
import db, { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { ErrorMessage } from '@hookform/error-message';

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
        toast.error("Can't create user");
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
        <ErrorMessage errors={errors} name="please enter valid email ID" />
        <input 
          type="tel"
          className="px-3 py-2 rounded-md"
          placeholder="Mobile number"
          {...register("Mobile_number", {
            required: true,
            
            minLength: {
              value: 10,
            message: "enter a valid phone number"
          }})}
        />
       <div className="text-red-700">{errors.Mobile_number?.message}</div>
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
        <select
          className="px-3 py-2 rounded-md"
          {...register("gender")}
          required
        >
          <option value={null} selected disabled hidden>
            Select Gender
          </option>
          <option value="M">M</option>
          <option value="F">F</option>
          <option value="others">Others</option>
        </select>
        <input
          className="px-3 py-2 rounded-md"
          type="undefined"
          placeholder="Semester"
          {...register("semester", { required: true , maxLength: { value:1, message: "enter a number between 1 and 8"}})}
        />
         <div className="text-red-700">{errors.semester?.message}</div>
        
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
          {...register("USN", { required: true, pattern: {value:"1RV???????"},maxLength:{value:10, message:"enter a valid USN" }})}
        />
        <div className="text-red-700">{errors.USN?.message}</div>
        <input
          className="px-3 py-2 rounded-md"
          type="email"
          placeholder="Counselor email"
          {...register("Counselor_email", { required: true, pattern: /^\S+@rvce.edu.in+$/i })}
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
