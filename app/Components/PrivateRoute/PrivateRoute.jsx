'use client'; 

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; 
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); 
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/api/auth/login'); 
    return null; 
  }

  return children; 
};

export default PrivateRoute;