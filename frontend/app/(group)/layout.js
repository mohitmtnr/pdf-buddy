import dynamic from 'next/dynamic';
import React, {Suspense} from 'react';
import Skeleton from 'react-loading-skeleton';

const NavBar = dynamic(() => import('./components/NavBar'));
const Footer = dynamic(() => import('./components/Footer'));

export default function Layout({children}) {
  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            height="100vh"
            width="100vw"
            borderRadius={0}
            baseColor="#f9fafb"
            highlightColor="#e5e7eb"
          />
        }
      >
        <NavBar />
        {children}
        <Footer />
      </Suspense>
    </>
  );
}
