// import EditTopicForm from "@/components/editTopicForm";


// const getTopicById = async ({id}:any) => {
//     try {
//         const res = await fetch(`http://localhost:3000/api/topic/${id}`, {
//             cache: "no-store"
//     });

//     if (!res.ok) {
//         throw new Error("failed to fetch topic");
//     }
//     return res.json();
// }
//      catch (error) {
//         console.log(error);
//     }
// };




// export default async function EditTopic({params}:any) {
//     const { id } = params;
//     const topic = await getTopicById(id);

//     if (!topic) {
//       // Handle the case when the topic is not found
//       return <div>Error: Topic not found</div>;
//     }
  
//     const {title, description} = topic;

//     return  <EditTopicForm  id={id} title={title} description= {description} />
// }

import EditTopicForm from "@/components/editTopicForm";

const getTopicById = async ({ id }: { id: any }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topic/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    const topic = await res.json(); // Parse the JSON response
    return { topic }; // Return an object with the topic property
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled elsewhere if needed
  }
};

export default async function EditTopic({ params }: { params: any }) {
  const { id } = params;

  try {
    const { topic } = await getTopicById({ id });

    if (!topic) {
      throw new Error("Topic not found");
    }

    const { title, description } = topic;

    return <EditTopicForm id={id} title={title} description={description} />;
  } catch (error) {
    console.error(error);
    // Handle the error, e.g., redirect to an error page or show an error message
    return <div>Error: Topic not found</div>;
  }
}
