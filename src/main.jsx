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
import ApointmentBooking from './Components/ApointmentBooking/ApointmentBooking';
import Privat from './Components/Privat/Privat';
import Admin from './Components/Admin/Admin';

import AdminLogin from './Components/Admin/Admin Login/AdminLogin';
import BookingList from './Components/Admin/Booking List/BookingList';



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
        path: `/update/:pathname/:_id`,
        element:<Privat><UpdateProfile></UpdateProfile></Privat>
      },
      {
        path: '/profile',
        element: <Privat><UserProfile></UserProfile></Privat>
     },
     {
      path: '/booking/:_id',
      element: <Privat><ApointmentBooking></ApointmentBooking></Privat>
     },
      {
        path: "/signup",
        element: <Signup></Signup> 
      },
      {
        path: "/login",
        element:<Login></Login>
      },
      
    ]
  },
  {
   path: '/doctor-panel-side',
   element: <Admin></Admin>,
   children:[
    {
      path : '/doctor-panel-side/bookingList',
      element: <BookingList></BookingList>
    }
   ]
  },
  {
    path : "/doctor-panel-side-access-login",
    element : <AdminLogin></AdminLogin>
  }
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
    <RouterProvider router={router} />
    
    
  </React.StrictMode>,
)
