import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";



const UserProfile = () => {

  const {pathname} = useLocation();

   


    const Atoken = localStorage.getItem('Access token');
    const Rtoken = localStorage.getItem('Refresh token');
    
    
    
      const token = {Access : Atoken,refresh : Rtoken};
    
    
     
    
      const [userData,setUserData] = useState([])
    
      const [newtok,setNewtok] = useState('')
    
    
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
        
     
      setUserData(data);
    
      })
      },[newtok,setUserData]);
    
    
    const {blood_group,date_of_birth,email,first_name,gender,id,last_name,picture,marital_status,nationality,occupation,phone_number,religion,emergency_contact} = userData;

   
    
   

    return (
        <div className="h-full" style={{backgroundImage: "url('https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg')",backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }>

<div  className=" flex flex-col md:flex-row gap-[50px] py-[50px]  mx-[40px] md:mx-[20px] lg:mx-[250px]">
            <div className="bg-slate-300 pb-[20px] w-[300px] "data-aos="fade-right" data-aso-duration="2000">
            <img className="h-[200px] w-[300px]" src={picture} alt="" />

            <h1 className="text-[35px] 
        bg-gradient-to-r from-red-400 to-slate-400 text-transparent bg-clip-text  mt-[10px] font-semibold pl-[10px] md:pl-[10px] lg:pl-[30px]">{first_name} {last_name}</h1>
            <h1 className="  text-[20px] mt-[10px] font-semibold pl-[10px] md:pl-[10px] lg:pl-[30px]">Email : <span className="text-red-400  bg-gradient-to-r from-red-400 to-slate-400 text-transparent bg-clip-text">{email}</span></h1>

            <p className="border-b-2 border-b-white w-[80%] mx-auto mt-[20px]"></p>
            <Link to={`/update${pathname}/1`}>
            <button className="bg-slate-400 p-[10px] text-white font-semibold hover:bg-red-400  mt-[30px] ml-[30px]">Update</button>
            </Link>
            </div>

            <div className=" w-[300px] md:w-[500px] lg:w-[800px] bg-slate-300 pb-[20px] pr-[10px] md:pr-[10px] lg:pr-0" data-aos="fade-left" data-aso-duration="2000">
                <h1 className="text-[35px] ml-[20px] mt-[20px] text-center underline font-semibold">Profile</h1>
             <h1 className="text-[35px] ml-[20px] mt-[20px] text-red-400 font-semibold  bg-gradient-to-r from-red-400 to-slate-400 text-transparent bg-clip-text">{first_name} {last_name}</h1>
             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[20px]"></p>

             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Email : <span className="text-red-400 ">{email}</span></h1>

             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[10px]"></p>
             
             <div className="flex lg:gap-[300px]">
             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Blood Group : <span className="text-red-400 ">{blood_group}</span></h1>
             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Gender: <span className="text-red-400 ">{gender}</span></h1>
             </div>

             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[10px]"></p>

             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Date of birth : <span className="text-red-400 ">{date_of_birth}</span></h1>

             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[10px]"></p>

             <div className="flex lg:gap-[330px]">
             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Religion: <span className="text-red-400 ">{religion}</span></h1>
             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Nationality: <span className="text-red-400 ">{nationality}</span></h1>
             </div>

             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[10px]"></p>

             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Phone Number : <span className="text-red-400 ">{phone_number}</span></h1>

             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[10px]"></p>

             <div className="flex lg:gap-[200px]">
             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Marital Status: <span className="text-red-400 ">{marital_status}</span></h1>
             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Occupation: <span className="text-red-400 ">{occupation}</span></h1>
             </div>

             <p className="border-b-2 border-b-white w-[95%] mx-auto mt-[10px]"></p>

             <h1 className="text-[22px] font-semibold ml-[20px] mt-[20px]">Emergency_Contact : <span className="text-red-400 ">{emergency_contact}</span></h1>
            
            </div>
        </div>

        </div>
    );
};

export default UserProfile;