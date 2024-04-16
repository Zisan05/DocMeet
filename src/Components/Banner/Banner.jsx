import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
          <div className="bg-cover bg-center h-[600px]" style={{backgroundImage: "url('https://i.ibb.co/D4m6Qwt/doctor-600nw-558136654.webp')"}}>
      {/* Content goes here */}


    {/* banner text */}
      <div className="md:w-[600px] lg:w-[700px]  md:pl-[100px] lg:pl-[150px] pt-[100px]">
        <h1 className="text-[45px] font-semibold text-slate-600 ">Make Appointment <br /> Today!</h1>
        <p className="text-[20px] text-red-400 font-semibold mt-[10px]">This is Doctor's Schedule. Please <Link to={"/login"}><button className="bg-slate-600 px-[5px] py-[4px] rounded-[5px] hover:bg-slate-100">login</button></Link> to make an appointment.</p>

       {/* date */}
       <div className="flex items-center mt-[20px] gap-[20px]">
       <SlCalender className=" text-[25px]"></SlCalender>
       <p className="text-[22px] ">2024-05-11</p>
       </div>
       <p className="border-b-[3px] mt-[5px] md:w-[400px] ml-[47px] border-b-slate-600"></p>

 

      </div>

    </div>
        </div>
    );
};

export default Banner;