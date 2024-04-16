import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";


const Category = () => {

    const [CategoryData, setCategoryData] = useState([]);

    const [id,setId] = useState(0);

    const [docData,setDocData] = useState([]);


// category work
    useEffect(() => {


        fetch(`https://pmshosen.pythonanywhere.com//api/patient/specialization-list/`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
          },
          
      })
      .then(res => res.json())
      .then(data => {

        console.log(data);
       
        setCategoryData(data)
        
      })
      } ,[setCategoryData])


    //   doctor information work

  useEffect(() => {

    if(id === 0 ) {
        fetch(`https://pmshosen.pythonanywhere.com/api/patient/appointment-list/`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
          },
          
      })
      .then(res => res.json())
      .then(data => {
       
        setDocData(data)
        
      })
    }

   if(id >= 1) {
        fetch(`https://pmshosen.pythonanywhere.com/api/patient/appointment-list/?id=${id}`,{
            method:"GET",
            credentials: "include",
            headers: {
                "content-type":"application/json",
            },
            
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);
         
          setDocData(data)
          
        })
    }

  },[setDocData,id])


  console.log(docData);

    return (
        <div className="w-[95%] container mx-auto ">
            <div className="flex flex-wrap justify-around mt-[50px] ">
           {
            CategoryData.map(data => <div onClick={() => setId(data.id)}>
                <img className="h-[80px] w-[80px] rounded-[50%]  hover:bg-red-400 " src={`https://pmshosen.pythonanywhere.com/${data.image}`} alt="" />
                <h1 className="text-[20px] font-bold text-slate-600 ml-[25px]">{data.specialized_name}</h1>
            </div>)
           }
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[50px] ">
            {
                docData.map(data => <div>
                   <div className="card card-side bg-base-300 shadow-xl  w-[310px] h-[270px] md:w-[350px] lg:w-[380px] pl-[10px] items-center">
  <figure><img className="h-[150px] w-[150px] rounded-[10px]" src="https://i.ibb.co/NWB2d8v/download.jpg" alt=""/></figure>
  <div className="card-body">
  <h1 className="text-[18px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Dr: </span> {data.doctor_detail.first_name}</h1>

  <h1 className="text-[15px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Date :</span> {data.date}</h1>

  <h1 className="text-[15px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Day :</span> {data.day}</h1>

  <h1 className="text-[12px] flex gap-[8px] font-bold mt-[5px]"><span className="text-red-400  text-[22px]"><FaClock></FaClock></span> {data.start_time} - {data.end_time}</h1>

  <button className="bg-red-400 text-white font-semibold rounded-[5px]  py-[3px] mt-[10px] px-[1px] hover:bg-slate-600">Book Apoinment</button>
    
    
  </div>
 
</div>

                </div>)
            }
        </div>

        </div>
    );
};

export default Category;




// <h1 className="text-[20px] text-red-400"><span className="text-slate-600 font-bold">Dr :</span> {data.first_name} {data.last_name}</h1>