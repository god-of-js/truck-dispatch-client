import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/my-trips');
      return;
    }
  }, []);

  return (
    <main>
      <Outlet />
    </main>
  );
}
