import { FaClipboardList } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Admin = () => {

    const Atoken = localStorage.getItem('Doctor Access token');
    const Rtoken = localStorage.getItem('Doctor Refresh token');
    
    
    
      const token = {Access : Atoken,refresh : Rtoken};

      const [userData,setUserData] = useState([])

      const [newtok,setNewtok] = useState('')


      useEffect( () => {
        fetch(`https://pmshosen.pythonanywhere.com/api/doctor/login/refresh/`,{
          method:"POST",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              
          },
          body:  JSON.stringify(token) ,
          
      })
      .then(res => res.json())
      .then(data => {
    
    
        setNewtok(data.access);
    
  
      
    
      })
      },[setNewtok]);



    //   geting doctor info

    useEffect( () => {

      
        fetch(`https://pmshosen.pythonanywhere.com/api/doctor/profile/`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              "Authorization": `Bearer ${newtok}`,
          },
          
          
      })
      .then(res => res.json())
      .then(data => {
        
     
      setUserData(data);
    
      })
      },[newtok,setUserData]);


      const {email,first_name,last_name} = userData

    


    return (
        <div>
            <div className="flex gap-[10px] items-center bg-slate-200 py-[20px] font-semibold text-slate-600 pl-[20px] text-[19px] md:text-[30px]">
            <img className="h-[30px] md:h-[50px] w-[30px] md:w-[50px]" src="https://i.ibb.co/rxp82yD/dr-img-desktop.jpg" alt="" />
             <h1 className=""><span className="text-red-400">Wellcome </span> {first_name} {last_name}</h1>
            </div>

{/* main div */}
           <div className="flex flex-col md:flex-row">

            {/* side bar div */}
           <div className="bg-slate-600 w-full md:w-[250px] text-white md:h-[600px] flex flex-col md:flex-col ">


<Link to={"/doctor-panel-side/bookingList"}>
<div tabindex="0" className="flex items-center gap-[10px] focus:bg-red-400 py-[15px] relative md:top-[30px] pl-[20px]">
<FaClipboardList className="text-[35px]"></FaClipboardList>
<h1 className="text-[22px] ">Booking list</h1>
</div>
</Link>
  
<div tabindex="0" className="flex items-center gap-[10px]  focus:bg-red-400 py-[15px] relative md:top-[30px] pl-[20px]">
<AiOutlineSchedule  className="text-[35px]"></AiOutlineSchedule >
<h1 className="text-[22px] ">Doctor Schedule</h1>
</div>

<div tabindex="0" className="flex items-center gap-[10px]  focus:bg-red-400 py-[15px] relative md:top-[30px] pl-[20px]">
<PiUserListBold   className="text-[35px]"></PiUserListBold >
<h1 className="text-[22px] ">Patient List</h1>
</div>

</div>

{/* changing page div */}
<div className="md:pl-[20px] md:w-[600px] lg:w-full ">

    <Outlet></Outlet>

</div>
           </div>

   

        </div>
    );
};

export default Admin;