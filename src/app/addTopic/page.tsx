"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
export default function AddTopic(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    const router = useRouter();

    const handleSubmit = async  (e:any) => {
        e.preventDefault();

        if(!title || !description){
            alert("Title and discription are required");
            return; 
        }
        try {
            const res = await fetch('http://localhost:3000/api/topic', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ title, description}),
            })
            if(res.ok) {
                router.push('/profile')
            }else{
                throw new Error("Failed to create a topic")
            }

        } catch (error) {
            console.log();
        }
    }
    return <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-32 bg-gray-800 mt-20 rounded-lg shadow-md mx-80 items-center justify-center h-auto px-20 w-auto">
        <input
        onChange={(e)=> setTitle(e.target.value)}
        value={title}
        className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic title"/>
        <textarea
        onChange={(e)=> setDescription(e.target.value)}
        value={description}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Topic description"/>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Topic</button>
        

        </form>
}