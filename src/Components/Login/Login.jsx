import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";



const Login = () => {

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
        const email = e.target.email.value;
        const phone_number = e.target.number.value;
        const password = e.target.password.value;
    
        const signInInfo = { phone_number, password,email };
  
        console.log(signInInfo);


        fetch('https://pmshosen.pythonanywhere.com/api/patient/login/',{
          method:"POST",
          headers: {
              "content-type":"application/json"
          },
          body: JSON.stringify(signInInfo)
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
   
          localStorage.setItem('Access token', data.access);
          localStorage.setItem('Refresh token', data.refresh);

    if(data.detail === "No active account found with the given credentials"){

      Swal.fire({
        title: "Opps",
        text: "You have no active account please go to Sign up page ",
        icon: "question",
        
      });

      e.target.reset();

    }

    else {

     

      Swal.fire({
        title: "Successfull",
        text: "You successully login in DocMeet",
        icon: "success",
        
      });
      
      e.target.reset();

      navigate(location?.state ? location.state : "/");
  }
         
      })
 

     
      
      }

     

    return (
        <div>
            <div  className="bg-cover bg-center h-[922px]" style={{backgroundImage: "url('https://i.ibb.co/VM2fyfm/stethoscope-doctor-md-medical-health-hospital.jpg')"}}>

            <div className="bg-white w-[315px] md:w-[400px] absolute le md:left-[200px] lg:left-[600px] top-[200px] px-[20px]  rounded-[10px] py-[80px]">
            <h1 className="text-[28px] text-red-400 font-semibold text-center">Welcome Back! </h1>
           

            <form onSubmit={handleLogin}>
            <div className="ml-[20px] mt-[20px]">
                <h1 className="text-[14px]">Email</h1>
                <input type="text" placeholder="Your Email" name="email" className="py-[8px] px-[10px] w-[240px] md:w-[320px] rounded-[5px] bg-[#e6e5e5f5] text-[14px]" />
                </div>

            <div className="ml-[20px] mt-[20px]">
                <h1 className="text-[14px]">Mobile Number</h1>
                <input type="text" placeholder="01xxxxxxxxx" name="number" className="py-[8px] px-[10px] w-[240px] md:w-[320px] rounded-[5px] bg-[#e6e5e5f5] text-[14px]" />
                </div>
                
                <div className="ml-[20px] mt-[20px]">
                <h1 className="text-[14px]">Password</h1>

  
                <input type={seen} placeholder="Your password" name="password" className="py-[8px] px-[10px] w-[240px] md:w-[320px] rounded-[5px] bg-[#e6e5e5f5] text-[14px]" />

                {
                  seen === "text" ?
                   <span onClick={handletogol}><IoEyeOffOutline className="text-[20px] absolute left-[240px] md:left-[320px] top-[330px]"></IoEyeOffOutline></span>
                  :
                  <span onClick={handletogol}><IoEyeOutline className="text-[20px] absolute left-[240px] md:left-[320px] top-[330px]"></IoEyeOutline></span>
                }
                
                </div>

                <div  className="ml-[20px] mt-[20px]">
                <button className="bg-red-400 mt-[20px] py-[8px] text-white font-semibold w-[240px] md:w-[320px] rounded-[5px]">Login</button>
                </div>
                <h1 className="text-center mt-[10px] text-[14px]">If you don't have an account please! <Link to={"/signup"} className="text-red-400">Sign Up</Link></h1>
            </form>
        </div>

            </div>
           
        </div>
    );
};

export default Login;