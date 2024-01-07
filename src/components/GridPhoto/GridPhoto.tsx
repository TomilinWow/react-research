import { IPhoto } from "../../types/photos";
import { PhotoCard } from "../PhotoCard/PhotoCard";
import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";

export const GridPhoto = () => {

  const [photos, setPhotos] = useState<IPhoto[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 ml-2 mr-2">
        {Array.isArray(photos) && photos?.map((photo) => {
          return <PhotoCard {...photo} key={photo.id} />
        })}
      </div>
    </Layout>
  );
};
