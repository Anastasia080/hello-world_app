// useLoginState.js
import { useSelector } from 'react-redux';

export const useLoginState = () => {
  return useSelector(state => state.auth.isLoggedIn);
};