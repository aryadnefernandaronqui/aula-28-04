import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/app/redux/hooks';

import { Navbar } from './components/Navbar';

export function Private() {
  const { user } = useAppSelector((state) => state);

  const redirect = useNavigate();

  useEffect(() => {
    if (!user.email) {
      redirect('/');
    }
  }, [user]);

  return (
    <>
      <Navbar settings={[]} />
      <Outlet />
    </>
  );
}
