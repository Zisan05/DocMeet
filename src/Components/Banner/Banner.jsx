import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const Banner = () => {

  const [liveDate,setLiveDate] = useState({})

  useEffect( () => {

      
    fetch(`https://mdzisanislam.pythonanywhere.com/api/patient/today-date/`,{
      method:"GET",
      
      headers: {
          "content-type":"application/json",
      },
      
      
  })
  .then(res => res.json())
  .then(data => {
  
  setLiveDate(data);

  })
  },[setLiveDate]);

  console.log(liveDate);

  const {date, name} = liveDate;

    return (
        <div>
          <div className="bg-cover bg-center h-[600px]" style={{backgroundImage: "url('https://i.ibb.co/D4m6Qwt/doctor-600nw-558136654.webp')"}}>
      {/* Content goes here */}


    {/* banner text */}
      <div className="md:w-[600px] lg:w-[700px] pl-[20px] md:pl-[100px] lg:pl-[150px] pt-[100px]" data-aos="fade-right"
     data-aos-duration="2000">
        <h1 className="text-[45px] font-semibold text-slate-600 ">Easy appointments<br />  and quick consultations!</h1>
        <p className="text-[20px] text-red-400 font-semibold mt-[20px]">Effortless <span className="text-slate-600">health</span> access and early protection for you and your family members to grow up <span className="text-slate-600">healthy</span>.</p>

       {/* date */}
       <div className="flex items-center mt-[20px] gap-[20px]">
       <SlCalender className=" text-[25px]"></SlCalender>
       <p className="text-[22px] ">{name} | {date}</p>
       </div>
       <p className="border-b-[3px] mt-[5px] md:w-[400px] ml-[47px] border-b-slate-600"></p>

 

      </div>

    </div>
        </div>
    );
};

export default Banner;