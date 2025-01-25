import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const DoctorSchedule = () => {

    const [newtok,setNewtok] = useState('')

    const Atoken = localStorage.getItem('Doctor Access token');
const Rtoken = localStorage.getItem('Doctor Refresh token');

  const token = {Access : Atoken,refresh : Rtoken};

const handleCreateSchedule =  (e) => {
    e.preventDefault();
        
    const day = e.target.day.value;
    const date = e.target.date.value;
    const start_time = e.target.start_time.value;
    const end_time = e.target.end_time.value;

    const createData = {day,date,start_time,end_time};

        fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/login/refresh/`,{
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


    //   Doctor Schedule posting

    fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/appointment-create/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${newtok}`,
      },
      body: JSON.stringify(createData), 
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        if(data === "Successful in creating a appointment."){
          Swal.fire({
            title: "Successfull",
            text: "You successully create a schedule!",
            icon: "success",
            
          });
          e.target.reset();
        }

        if(data === "UnSuccessful in creating a appointment."){
          Swal.fire({
            title: "Error",
            text: "Please enter the correct imformation !",
            icon: "error",
            
          });
        }
    
      })
      .catch((error) => {
        console.error("Error fetching book list:", error);
      });
      

 }

    return (
        <div>
            <h1 className="text-[40px] font-semibold mt-[30px] text-red-400 ">DocMeet Doctor Schedule</h1>
            <div className="  lg:w-[800px] flex flex-col md:flex-row ">
                <div className="bg-red-400 w-[350px] hidden md:hidden lg:block">
                   <h1 className="text-white text-[30px] md:text-[25px] lg:text-[35px] font-semibold text-center relative top-[200px]">Hey</h1>
                   <h1 className="text-white text-[30px] md:text-[25px] lg:text-[35px] font-semibold text-center relative top-[200px]">Here you can create a schedule when you are free.</h1>
                </div>

                <div className="md:w-[550px] lg:w-[400px]  pb-[50px] bg-slate-600">

                    <h1 className=" text-[35px] text-center font-bold mt-[10px] text-white">Doctor Schedule</h1>
                    <form onSubmit={handleCreateSchedule}>
                      <div className="ml-[30px] mt-[20px]">
                        <h1 className="text-[25px] font-semibold text-white">Day</h1>
                        <input className="py-[8px] w-[80%] md:w-[400px] pl-[10px] lg:w-[350px] mt-[10px] rounded" type="text" name="day" placeholder="Day" />
                      </div>

                      <div className="ml-[30px] mt-[20px]">
                        <h1 className="text-[25px] font-semibold text-white">Date</h1>
                        <input className="py-[8px] w-[80%] md:w-[400px] pl-[10px] lg:w-[350px] mt-[10px] rounded" type="text" name="date" placeholder="Year-month-day"/>
                      </div>

                      <div className="ml-[30px] mt-[20px]">
                        <h1 className="text-[25px] font-semibold text-white">Start time</h1>
                        <input className="py-[8px] w-[80%] md:w-[400px] pl-[10px] lg:w-[350px] mt-[10px] rounded" type="text" name="start_time" placeholder="Hour : minute"/>
                      </div>

                      <div className="ml-[30px] mt-[20px]">
                        <h1 className="text-[25px] font-semibold text-white">End time</h1>
                        <input className="py-[8px] w-[80%] md:w-[400px] pl-[10px] lg:w-[350px] mt-[10px] rounded" type="text" name="end_time" placeholder="Hour : minute"/>
                      </div>


                      <button className="bg-red-400 mt-[20px] py-[8px] px-[10px] ml-[30px] font-semibold text-white">Submit</button>
                      
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorSchedule;