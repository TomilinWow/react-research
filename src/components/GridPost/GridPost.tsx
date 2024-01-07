import { IPost } from "../../types/posts";
import { PostCard } from "../PostCard/PostCard";
import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";


export const GridPost = () => {

  const [posts, setPosts] = useState<IPost[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 ml-4 mr-4">
        {posts?.map((post) => {
          return <PostCard {...post} key={post.id} />
        })}
      </div>
    </Layout>
  )
}
