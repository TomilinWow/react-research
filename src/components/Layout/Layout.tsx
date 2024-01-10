import React, { FC, ReactElement } from 'react';
import { Link } from "react-router-dom";

interface ILayout {
  children: ReactElement;
}
export const Layout: FC<ILayout> = ({children}) => {
  return (
    <main className="flex h-screen flex-col items-center overflow-hidden bg-blue-200 from-slate-300 via-slate-50 to-slate-300">
      <nav className="flex h-10 w-full shrink-0 grow-0 items-center border-b border-slate-600 bg-blue-500">
        <div className="flex w-full gap-4 p-2 font-semibold md:max-w-2xl text-white">
          <Link id="home-link" to="/">
            <span>Home</span>
          </Link>
          <Link id="post-link" to="/post">
            <span>Posts</span>
          </Link>
          <Link id="photo-link" to="/photo">
            <span>Photos</span>
          </Link>
        </div>
      </nav>
      <div className="flex w-full flex-grow justify-center overflow-y-auto bg-sky-100 md:max-w-4xl md:border-blue-100">
        {children}
      </div>
    </main>
  );
};
