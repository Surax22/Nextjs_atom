"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const route = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, steButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup successful", response.data);
      route.push("/login");
    } catch (error:any) {
      console.log("Signup Failed",error.message);
      toast.error(error.message);
    } finally {
    setLoading(false);
    };
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      steButtonDisabled(false);
  }else{
    steButtonDisabled(true);
  }
  
}, [user]);

  return (
    <div className=" pt-8 items-center justify-between  lg:flex">
    <div className="flex flex-col gap-3 py-32 bg-gray-800 font-bold rounded-lg shadow-md mx-auto items-center justify-center h-auto px-20 w-auto pt-2 lg:flex">
      <h1>{loading ? "Processing": "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none
            focus:border-gray-600 "
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Sign Up"}
      </button>
      <Link href="/login"> Already have an account</Link>
    </div>
    </div>
  );
}
