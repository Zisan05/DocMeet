import { Link } from "react-router-dom";

import {  useEffect, useState } from "react";


const Navbar = () => {

  const Atoken = localStorage.getItem('Access token');
  const Rtoken = localStorage.getItem('Refresh token');

  const token = {Access : Atoken,refresh : Rtoken};

  

  const [userData,setUserData] = useState('undefined')






useEffect( () => {
  fetch(`https://mdzisanislam.pythonanywhere.com/api/patient/login/refresh/`,{
    method:"POST",
    credentials: "include",
    headers: {
        "content-type":"application/json",
        
    },
    body:  JSON.stringify(token) ,
    
})
.then(res => res.json())
.then(data => {



  const newTok =data.access;



  fetch(`https://mdzisanislam.pythonanywhere.com/api/patient/profile/`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
        "Authorization": `Bearer ${newTok}`,
    },
    
})
.then(res => res.json())
.then(data => {

  
  setUserData(data)
})

})
},[setUserData]);
  

const {first_name,picture} = userData;




// remove token

const handleRemoveToken = () => {
  localStorage.removeItem('Refresh token');
  localStorage.removeItem('Access token');

  location.reload();

} 




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
      <Link to={'/'}><img className="h-[70px] w-[70px] rounded-[50%]" src="https://i.ibb.co/rxp82yD/dr-img-desktop.jpg" alt="" /></Link>
      <Link to={'/'}><h1 className="text-[35px] text-red-400 font-bold">Doc<span className="text-slate-600">Meet</span></h1></Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          
 
          {
           Atoken === null  ? <Link to={'/login'}> <button className="bg-red-400 p-[15px] font-semibold text-[20px] w-[80px] rounded-[5px] hover:bg-slate-300">login</button> </Link> : <div className="flex items-center gap-[5px]">
         <h1 className="text-[23px] text-slate-600 font-bold">Hi!  <span className="text-red-400">{first_name}</span></h1>
         
          

   <div className="dropdown dropdown-bottom dropdown-end ">
   <div tabIndex={0} role="button" className=" m-1 "><img  className="h-[45px] w-[45px] rounded-[50%]" alt="photo upload soon" src={picture}/></div>
   <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-basrounded-box w-52 bg-red-400">
     <Link to={"/profile"}><li className="hover:bg-slate-200"><a>Profile</a></li></Link>
     <li onClick={handleRemoveToken} className="hover:bg-slate-200"><a>Logout</a></li>
  </ul>
   </div>            
              
          
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
      <Link to={"/"}><h1 className="text-[35px] text-red-400 font-bold mb-[20px] mt-[30px]">Doc<span className="text-slate-600">Meet</span></h1></Link>
    <Link to={'/'}><p className="border-b-[10px] border-b-red-400 rounded-[5px] mb-[20px] "></p></Link>
      

      {
        Atoken === null ? <Link to={"/login"}><button className="bg-red-400 p-[15px] font-semibold text-[20px] w-[80px] rounded-[5px] hover:bg-slate-300">login</button></Link> : <div className=" mx-auto items-center gap-[5px]">

<div className="dropdown dropdown-bottom md:dropdown-end ">
   <div tabIndex={0} role="button" className=" m-1 "><img className="h-[45px] w-[45px] rounded-[50%] mb-[10px] ml-[30px]" alt="photo upload soon" src={picture}/></div>
   <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-basrounded-box w-[140px] md:w-52 bg-red-400">
     <Link to={"/profile"}><li className="hover:bg-slate-200 "><a>Profile</a></li></Link>
     <li onClick={handleRemoveToken} className="hover:bg-slate-200"><a>Logout</a></li>
  </ul>
   </div> 

        <h1 className="text-[23px] text-slate-600 font-bold">Hi!  <span className="text-red-400">{first_name}</span></h1>


          </div>
      }

    </ul>
  </div>
</div>
        </div>
    );
};

//  className="bg-red-400 p-[15px] font-semibold text-[20px] w-[80px]


export default Navbar;




// <img  className="h-[45px] w-[45px] rounded-[50%]" alt="photo upload soon" src="https://i.ibb.co/SfV3bN3/abstract-user-flat-4.png"/> :  <img className="h-[45px] w-[45px] rounded-[50%] mb-[10px] ml-[30px]" alt="photo upload soon" src={picture}/>