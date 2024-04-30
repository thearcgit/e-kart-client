import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {router} from './features/auth/components/MainRouter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';

function App() {
  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if(loggedInUser){

      dispatch(fetchItemsByUserIdAsync(loggedInUser.id))
      dispatch(fetchLoggedInUserAsync(loggedInUser.id))
    }
  },[dispatch,loggedInUser])
  return (
    <div className="App">   
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
