import { useSelector } from 'react-redux';

export const useLoginState = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn;
};