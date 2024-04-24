import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import Swal from "sweetalert2";

const Signup = () => {

    const [seen,setSeen] = useState("password");

    const navigate = useNavigate();

    const handletogol = () => {
        if(seen === "password"){
          setSeen('text');
        }
    
        else if(seen === "text") {
          setSeen('password');
        }
      }

      const handleSignUp = e => {
        e.preventDefault();
      const email = e.target.email.value;
      const phone_number = e.target.number.value;
      const password = e.target.password.value;
  
      const signUpInfo = { phone_number, password,email };

      console.log(signUpInfo);


      fetch('https://pmshosen.pythonanywhere.com/api/patient/register/',{
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(signUpInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)


            if(data.message === "Completed your registration process!"){

              Swal.fire({
                title: "Successfully SignUp",
                text: "Your Account is created in DocMeet",
                icon: "success",
                
              });
              
              e.target.reset();

              navigate(location?.state ? location.state : "/login");
          }

      if(data.message === "You have already account at DocMeet"){

        Swal.fire({
          title: "Opps",
          text: "You already have an account please go to login page",
          icon: "question",
          
        });

        e.target.reset();

      }
           
        })
      }


    return (
        <div>
        <div  className="bg-cover bg-center h-[922px]" style={{backgroundImage: "url('https://i.ibb.co/VM2fyfm/stethoscope-doctor-md-medical-health-hospital.jpg')"}}>

        <div className="bg-white w-[335px] md:w-[400px] absolute left-[20px] md:left-[200px] lg:left-[600px] top-[200px] px-[20px]  rounded-[10px] py-[80px]">
        <h1 className="text-[28px] text-red-400 font-semibold text-center">Lets create an acoount! </h1>
       

        <form onSubmit={handleSignUp}>
        <div className="ml-[20px] mt-[20px]">
            <h1 className="text-[14px]">Email</h1>
            <input type="email" placeholder="Your Email" name="email" className="py-[8px] px-[10px] w-[240px] md:w-[320px] rounded-[5px] bg-[#e6e5e5f5] text-[14px]" />
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
               <span onClick={handletogol}><IoEyeOffOutline className="text-[20px] absolute left-[240px] md:left-[320px] top-[330px] md:top-[330px]"></IoEyeOffOutline></span>
              :
              <span onClick={handletogol}><IoEyeOutline className="text-[20px] absolute left-[240px] md:left-[320px] top-[330px] md:top-[330px]"></IoEyeOutline></span>
            }
            
            </div>

            <div  className="ml-[20px] mt-[20px]">
            <button className="bg-red-400 mt-[20px] py-[8px] text-white font-semibold w-[240px] md:w-[320px] rounded-[5px]">Sign up</button>
            </div>
            <h1 className="text-center mt-[10px] text-[14px]">If You already have an account please! <Link to={"/login"} className="text-red-400">Login</Link></h1>
        </form>
    </div>

        </div>
    </div>
    );
};

export default Signup;