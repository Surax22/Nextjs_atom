
"use client"
import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation";

export default function RemoveBtn({id}: { id: string}){
    const router = useRouter();
    const removeTopic = async () => {
        const confirmed = confirm("Are you sure you want to remove");

        if (confirmed) {
          const res =  await fetch(`http://localhost:3000/api/topic?id=${id}`, {
                method: "DELETE",
            });
            if(res.ok) {
                router.refresh();
            }
        }
    }
    return (
    <button onClick={removeTopic}>
        <HiOutlineTrash size={24} />
    </button>
        )
}