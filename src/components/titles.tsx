// import Link from "next/link";
// import RemoveBtn from "./removeBtn";
// import { HiPencilAlt } from "react-icons/hi";

// const getTopics = async() => {
//   try {
//     const res = await fetch('http://localhost:3000/api/topic', {
//       cache: "no-store",
//     });

//     if(!res.ok){
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };
// export default async function Titles() {

//   const { topics } = await getTopics();

//   return (
//     <>
//     {topics.map((t:any) => (
//       <div key={t._id} className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white">
//         <div>
//           <h2 key={t._id}>{t.title}</h2>
//           <div>{t.description}</div>
//         </div>

//         <div>
//           <RemoveBtn  id={t._id}/>
//           <Link href={`/editTopic/${t._id}`}>
//             <HiPencilAlt size={24} />
//           </Link>
//         </div>
//       </div>
//       ))}

//     </>
//   );
// }


import Link from "next/link";
import RemoveBtn from "./removeBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topic', {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading topics: ", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

const Titles = () => {
  const fetchTopics = async () => {
    try {
      const { topics } = await getTopics();
      return topics;
    } catch (error) {
      console.error("Error fetching topics: ", error);
      return []; // Return an empty array or handle the error gracefully
    }
  };

  return (
    <>
      {fetchTopics().then((topics) =>
        topics.map((t: any) => (
          <div key={t._id} className=" flex justify-between my-4 bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white">
            <div>
              <h2 key={t._id}>{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div>
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Titles;
