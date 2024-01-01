"use client";

import Titles from "@/components/titles";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logged out");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getCheck = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col gap-3 py-32 bg-gray-800 mt-20 rounded-lg shadow-md mx-80 items-center justify-center h-auto px-20 w-auto">
      <h1 className="text-2xl font-bold">Notes</h1>
      <h2 className="p-1 bg-green-500 rounded">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <div>
        <Titles />
      </div>
      <hr />
      <div className="flex justify-between gap-10">
        <div
          className="hover:bg-gray-700 p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none
        focus:border-gray-600"
          id="navbar-solid-bg"
        >
          <Link href={"/addTopic"}>Add Note</Link>
        </div>
        <button
          onClick={logout}
          className="hover:bg-gray-700 p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none
            focus:border-gray-600"
        >
          Logout
        </button>
      </div>

      <button
        onClick={getUserDetails}
        className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Get user detail
      </button>
      <button onClick={getCheck}>check</button>
    </div>
  );
}
