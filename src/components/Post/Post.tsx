import React, { useEffect, useState } from 'react';
import { Layout } from "../Layout/Layout";
import { useParams } from "react-router-dom";
import { IPost } from "../../types/posts";

const Post = () => {

  const [post, setPost] = useState<IPost>();
  const { id = '' } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="flex h-max w-full flex-col gap-20 p-4 bg-blue-200 m-4">
        <div className="flex justify-center mt-4">
          <span className="rounded-md p-1 font-bold text-gray-900">{post?.title}</span>
        </div>
        <div className="flex justify-center">
          <p className="rounded-md w-100 font-semibold text-gray-900">{post?.body}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
