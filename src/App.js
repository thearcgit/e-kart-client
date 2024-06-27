import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { router } from './features/auth/components/MainRouter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { checkAuthAsync, selectChecked } from './features/auth/authSlice';

function App() {
  const loggedInUserToken = useSelector(state => state.auth.loggedInUserToken)
  const checkedAuth = useSelector(selectChecked)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [])
  useEffect(() => {
    if (loggedInUserToken) {

      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, loggedInUserToken])
  return (
    <>
  {checkedAuth && <div className="App">
    <RouterProvider router={router} />
  </div>}
    </>
  );
}

export default App;
