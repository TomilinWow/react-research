import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Photo } from "../Photo/Photo";
import Post from "../Post/Post";
import { GridPost } from "../GridPost/GridPost";
import { GridPhoto } from "../GridPhoto/GridPhoto";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/post"
        element={<GridPost />}
      />
      <Route path="/post/:id" element={<Post />} />
      <Route
        path="/photo"
        element={<GridPhoto />}
      />
      <Route path="/photo/:id" element={<Photo />} />
    </Routes>
  );
};

export default AppRouter;
