"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const route = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, steButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login successful");
      route.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      steButtonDisabled(false);
    } else {
      steButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" pt-8 items-center justify-between  lg:flex">
    <div className="flex flex-col gap-3 py-32 bg-gray-800 font-bold rounded-lg shadow-md mx-auto items-center justify-center h-auto px-20 w-auto pt-2 lg:flex">
      <h1 className="text-2xl">{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email" className="text-xl ">Email</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="Password" className="text-xl font-bold ">Password</label>
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
            focus:border-gray-600"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup"> Create new account</Link>
    </div>
    </div>
  );
}
