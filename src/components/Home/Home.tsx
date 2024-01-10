import React from 'react';
import { Layout } from "../Layout/Layout";

export const Home = () => {
  return (
    <Layout>
      <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-10 border-amber-300">
        <div id='home-element' className="h-10 w-full text-center text-5xl font-bold text-gray-900">
          React js
        </div>
      </div>
    </Layout>
  );
};

