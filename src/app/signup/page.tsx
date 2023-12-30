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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing": "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="username">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="username">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg text-black"
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
  );
}
