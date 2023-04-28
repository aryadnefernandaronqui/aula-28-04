import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';

import { Navbar } from './components/Navbar';
import { userActions } from '@/app/redux/modules/user';

export function Public() {
  // const { user } = useAppSelector((state) => state);
  // const redirect = useNavigate();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (user.remember) {
  //     redirect('/auth');
  //   } else {
  //     dispatch(userActions.isLogged());
  //     if (user.email) redirect('/auth');
  //     else redirect('/');
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
