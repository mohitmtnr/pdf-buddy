'use client';
import dynamic from 'next/dynamic';
import AuthenticateUser from './components/AuthenticateUser';
const UploadPdf = dynamic(() => import('./components/UploadPdf'));
function Home() {
  return (
    <main className="w-full lg:w-3/4  ">
      <UploadPdf />
    </main>
  );
}

export default AuthenticateUser(Home, '68vh');
