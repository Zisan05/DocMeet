import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UserProfile from './Components/UserProfile/UserProfile';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/update',
        element:<UpdateProfile></UpdateProfile>
      },
      {
        path: '/profile',
        element: <UserProfile></UserProfile> 
     }
      
    ]
  },
  {
    path: "/signup",
    element: <Signup></Signup> 
  },
  {
    path: "/login",
    element:<Login></Login>
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <RouterProvider router={router} />
    
    
  </React.StrictMode>,
)
