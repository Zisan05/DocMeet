
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";


const ApointmentBooking = () => {


   

   const {pathname} = useLocation()


    console.log(pathname);


    // User Information

    const Atoken = localStorage.getItem('Access token');
    const Rtoken = localStorage.getItem('Refresh token');
    
    
    
      const token = {Access : Atoken,refresh : Rtoken};
    
    
     
    
      const [userData,setUserData] = useState([]);

      
    
      const [newtok,setNewtok] = useState('');
    
    
    //   use the token to get new token
      useEffect( () => {
        fetch(`https://pmshosen.pythonanywhere.com/api/patient/login/refresh/`,{
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
    
    
    
    // use the new token to get the user info
    
    useEffect( () => {
        fetch(`https://pmshosen.pythonanywhere.com/api/patient/profile/`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              "Authorization": `Bearer ${newtok}`,
          },
          
          
      })
      .then(res => res.json())
      .then(data => {
        
        console.log(data);
      setUserData(data);
    
      })
      },[newtok,setUserData]);
    
    
    const {blood_group,date_of_birth,email,first_name,gender,last_name,picture,marital_status,nationality,occupation,phone_number,religion,emergency_contact} = userData;


    // Doctor and apointment information

    const [docInfo,setDocinfo] = useState([]);

    const { id } = useParams();

   

    useEffect( () => {
        fetch(`https://pmshosen.pythonanywhere.com/api/patient/appointment-list/?id=${id}`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              
          },
         
          
          
      })
      .then(res => res.json())
      .then(data => {

       
        
     data.map(item => setDocinfo(item))  
     
    
      })
      },[newtok,setDocinfo]);




const {doctor_detail,date,day,start_time,end_time} = docInfo;



    

    return (
        <div style={{backgroundImage: "url('https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg')",backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } } className="px-[45px] md:px-[60px] lg:px-[200px] flex flex-col md:flex-row gap-[50px] py-[50px] ">
        <div className="bg-slate-300 pb-[20px] w-[280px]">
        <img className="h-[200px] w-[280px]" src={picture} alt="" />

        <h1 className="text-[25px] mt-[10px] font-semibold pl-[10px] md:pl-[10px] lg:pl-[30px]">{first_name} {last_name}</h1>
        <h1 className="text-[20px] mt-[10px] font-semibold pl-[10px] md:pl-[10px] lg:pl-[30px]">Email : <span className="text-red-400">{email}</span></h1>

        <p className="border-b-2 border-b-white w-[80%] mx-auto mt-[20px]"></p>
        <Link to={`/update${pathname}`}>
        <button className="bg-slate-400 p-[10px] text-white font-semibold hover:bg-red-400  mt-[30px] ml-[30px]">Update</button>
        </Link>
        </div>

        <div className=" w-[280px] md:w-[500px] lg:w-[800px] bg-slate-300 pb-[20px] pr-[10px] md:pr-[10px] lg:pr-0">
            <h1 className="text-[35px] ml-[20px] mt-[20px] text-center underline font-semibold">Apointment Info</h1>

{/* apointment booking info */}

         <div className="border-[2px] border-slate-400 w-[260px] md:w-[350px] lg:w-[750px] mx-auto px-[20px] py-[20px]">

           <div className="border-[4px] ">
           <h1 className="text-[20px] font-bold border-2  py-[6px] bg-red-400 text-center">Patient Information</h1>

           <div className="px-[10px] py-[10px]  mb-[20px]">
            <h1 className="text-[18px] font-semibold">Patient Name : <span className="text-red-400">{first_name} {last_name}</span></h1>
            <h1 className="text-[18px] font-semibold">Email: <span className="text-red-400">{email}</span></h1>
            <h1 className="text-[18px] font-semibold">Phone Number : <span className="text-red-400">{phone_number}</span></h1>
            <h1 className="text-[18px] font-semibold">Blood Group : <span className="text-red-400">{blood_group}</span></h1>
            <h1 className="text-[18px] font-semibold">Date of birth : <span className="text-red-400">{date_of_birth}</span></h1>
            
           </div>


           </div>

           <div className="border-[4px] mt-[20px]">
           <h1 className="text-[20px] font-bold border-2  py-[6px] bg-red-400 text-center"> Apointment time Information</h1>

           <div className="px-[10px] py-[10px]  mb-[20px]">
            <h1 className="text-[18px] font-semibold">Date : <span className="text-red-400">{date}</span></h1>
            <h1 className="text-[18px] font-semibold">Day: <span className="text-red-400">{day}</span></h1>
            <h1 className="text-[18px] font-semibold">Time : <span className="text-red-400">{start_time} - {end_time}</span></h1>
            
            
           </div>


           </div>
            <h1 className="mt-[20px] text-[20px] font-bold">Sympthom: </h1>
           <input className="w-full py-[3px] mt-[6px] rounded-[3px] px-[5px]" type="text" />


           <h1 className="mt-[20px] text-[20px] font-bold">Comment: </h1>
           <input className="w-full py-[10px] mt-[6px] rounded-[3px] px-[5px]" type="text" />

           <button className="bg-slate-400 mt-[20px] py-[5px] px-[6px] text-white font-semibold hover:bg-red-400">Make Apointment</button>
         
         </div>
        
        </div>
    </div>
    );
};

export default ApointmentBooking;