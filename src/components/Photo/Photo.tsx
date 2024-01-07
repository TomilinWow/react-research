import React, { useEffect, useState } from 'react';
import { Layout } from "../Layout/Layout";
import { useParams } from "react-router-dom";
import { IPhoto } from "../../types/photos";

export const Photo = () => {

  const [photo, setPhoto] = useState<IPhoto>();
  const { id = '' } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      <div className="flex h-max w-full flex-col justify-center gap-20">
        <div className="flex justify-center mt-4">
          <span className="rounded-md p-1 font-bold text-gray-900">{photo?.title}</span>
        </div>
        <div className="flex justify-center">
          <img width={300} height={300} src={photo?.url}/>
        </div>
      </div>
    </Layout>
  );
};
