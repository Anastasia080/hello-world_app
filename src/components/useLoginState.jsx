// hooks/useLoginState.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';

export const useLoginState = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return isLoggedIn;
};