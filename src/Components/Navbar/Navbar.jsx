import { Link } from "react-router-dom";

import {  useEffect, useState } from "react";


const Navbar = () => {

  const token = localStorage.getItem('Access token');

  

  const [userData,setUserData] = useState([])





useEffect(() => {


  fetch(`https://pmshosen.pythonanywhere.com/api/patient/profile/`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
        "Authorization": `Bearer ${token}`,
    },
    
})
.then(res => res.json())
.then(data => {

  setUserData(data);
})
} ,[setUserData])
  



const {first_name,profile_picture} = userData;





    return (
        <div>
            <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
      <div className="flex-1 px-2 mx-2">
      <img className="h-[70px] w-[70px] rounded-[50%]" src="https://i.ibb.co/rxp82yD/dr-img-desktop.jpg" alt="" />
      <h1 className="text-[35px] text-red-400 font-bold">Doc<span className="text-slate-600">Meet</span></h1>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          

          {
           userData.length === 0 ? <Link to={'/login'}><li><a className="bg-red-400 p-[15px] font-semibold text-[20px] w-[80px]">Login</a></li></Link> : <div className="flex items-center gap-[5px]">
         <h1 className="text-[23px] text-slate-600 font-bold">Hi!  <span className="text-red-400">{first_name}</span></h1>
         
          <Link to={"/profile"}><img  className="h-[45px] w-[45px] rounded-[50%]" alt="photo upload soon" src={`https://pmshosen.pythonanywhere.com/${profile_picture}`}/></Link>
           </div>
           
          }
        </ul>
      </div>
    </div>
    {/* Page content here */}
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-[200px] md:w-80 min-h-[500px] bg-base-200">
      {/* Sidebar content here */}
      <h1 className="text-[35px] text-red-400 font-bold mb-[20px] mt-[30px]">Doc<span className="text-slate-600">Meet</span></h1>
    <p className="border-b-[10px] border-b-red-400 rounded-[5px] mb-[20px] "></p>
      

      {
        userData.length === 0 ? <Link to={"/login"}><li><a className="bg-red-400 p-[15px] font-semibold text-[20px] w-[80px]">Login</a></li></Link> : <div className=" mx-auto items-center gap-[5px]">

           
         <img className="h-[45px] w-[45px] rounded-[50%] mb-[10px] ml-[30px]" alt="photo upload soon" src={`https://pmshosen.pythonanywhere.com/${profile_picture}`}/>

        <h1 className="text-[23px] text-slate-600 font-bold">Hi!  <span className="text-red-400">{first_name}</span></h1>


          </div>
      }

    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;