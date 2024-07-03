import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminLogin = () => {

    const [seen,setSeen] = useState("password");

    const [token,setToken] = useState('')
  
    
  
      const navigate = useNavigate();
  
      const handletogol = () => {
          if(seen === "password"){
            setSeen('text');
          }
      
          else if(seen === "text") {
            setSeen('password');
          }
        }
  
        const handleLogin = e => {
          e.preventDefault();
          
          const phone_number = e.target.number.value;
          const password = e.target.password.value;
      
          const signInInfo = { phone_number, password};
    
         
  
  
          fetch('https://pmshosen.pythonanywhere.com/api/doctor/login/',{
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(signInInfo)
        })
        .then(res => res.json())
        .then(data => {
           

            localStorage.setItem('Doctor Access token', data.access);
            localStorage.setItem('Doctor Refresh token', data.refresh);

            if(data.access) {
  
       
  
              Swal.fire({
                title: "Successfull",
                text: "You successully login in DocMeet",
                icon: "success",
                
              });
              
              e.target.reset();
        
              navigate(location?.state ? location.state : "/doctor-panel-side/bookingList");
        
              location.reload();
          }
  
      else {
  
        Swal.fire({
          title: "Opps",
          text: "Please enter the correct imformation!",
          icon: "question",
          
        });

        e.target.reset();
      }

      
           
        })
   
  
       
        
        }



    return (
        <div>
            <div>
            <div  className="bg-cover bg-center h-[1100px]" style={{backgroundImage: "url('https://i.ibb.co/VM2fyfm/stethoscope-doctor-md-medical-health-hospital.jpg')"}}>

            <div className="bg-white w-[335px] md:w-[400px]  mx-auto relative top-[200px] px-[20px]  rounded-[10px] py-[80px]">
            <h1 className="text-[28px] text-red-400 font-semibold text-center">Welcome Back! </h1>
           

            <form onSubmit={handleLogin}>
          

            <div className="ml-[20px] mt-[20px]">
                <h1 className="text-[14px]">Mobile Number</h1>
                <input type="text" placeholder="01xxxxxxxxx" name="number" className="py-[8px] px-[10px] w-[240px] md:w-[320px] rounded-[5px] bg-[#e6e5e5f5] text-[14px]" />
                </div>
                
                <div className="ml-[20px] mt-[20px]">
                <h1 className="text-[14px]">Password</h1>

  
                <input type={seen} placeholder="Your password" name="password" className="py-[8px] px-[10px] w-[240px] md:w-[320px] rounded-[5px] bg-[#e6e5e5f5] text-[14px]" />

                {
                  seen === "text" ?
                   <span onClick={handletogol}><IoEyeOffOutline className="text-[20px] absolute left-[240px] md:left-[320px] top-[250px]"></IoEyeOffOutline></span>
                  :
                  <span onClick={handletogol}><IoEyeOutline className="text-[20px] absolute left-[240px] md:left-[320px] top-[250px]"></IoEyeOutline></span>
                }
                
                </div>

                <div  className="ml-[20px] mt-[20px]">
                <button className="bg-red-400 mt-[20px] py-[8px] text-white font-semibold w-[240px] md:w-[320px] rounded-[5px]">Login</button>
                </div>
            </form>
        </div>

            </div>
           
        </div>
        </div>
    );
};

export default AdminLogin;