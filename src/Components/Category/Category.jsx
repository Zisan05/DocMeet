import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";


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

            
         
          setDocData(data)
          
        })
    }

  },[setDocData,id])


  // Doc personal info

  const [DocPersonalInfo,setDocPersonalInfo] = useState({})

const handleDocPersonalInfo = (_id) => {

  console.log(_id);



  fetch(`https://pmshosen.pythonanywhere.com/api/doctor/detail/?id=${_id}`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
    },
    
})
.then(res => res.json())
.then(data => {

console.log(data);

setDocPersonalInfo(data);
  
})



} 

console.log(DocPersonalInfo);


const{email,image,name,qualification,specialization} = DocPersonalInfo;

console.log(email,image,name,qualification,specialization);



    return (
        <div className="w-[95%] container mx-auto ">
            <div className="flex flex-wrap justify-around mt-[50px] ">
           {
            CategoryData.map(data => <div onClick={() => setId(data.id)}>
                <img className="h-[120px] w-[120px] rounded-[50%] p-[5px]" src={data.picture} alt="" />
                <h1 className="text-[20px] font-bold text-slate-600 ml-[25px]">{data.specialized_name}</h1>
            </div>)
           }
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[50px] ">
            {
                docData.map(data => <div>
                   <div className="card card-side bg-base-300 shadow-xl  w-full h-[270px] md:w-[350px] lg:w-[380px] pl-[10px] items-center">
  <figure  onClick={() => handleDocPersonalInfo(data.id)}><img onClick={()=>document.getElementById('my_modal_1').showModal()} className="h-[150px] w-[150px] rounded-[10px]" src={data.doctor_detail.picture} alt=""/></figure>

{/* modal */}

<dialog id="my_modal_1" className="modal">
  <div className="modal-box bg-gray-300">
    <div className="flex items-center gap-[20px]">
    <img className="w-[100px] h-[150px] rounded-[5px]" src={image} alt="" />
    <div>
      <h1 className="text-[20px] font-bold text-slate-600">Name: <span className="text-red-400">{name}</span></h1>
      <h1 className="text-[20px] font-bold text-slate-600 mt-[15px]">Specialization: <span className="text-red-400">{specialization}</span></h1>
      <h1 className="text-[20px] font-bold text-slate-600 mt-[15px]">Qualification: <span className="text-red-400">{qualification}</span></h1>
    </div>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn hover:bg-red-400">Close</button>
      </form>
    </div>
  </div>
</dialog>
 


  <div className="card-body">
  <h1 className="text-[18px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Dr: </span> {data.doctor_detail.first_name} {data.doctor_detail.last_name}</h1>

  <h1 className="text-[15px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Date :</span> {data.date}</h1>

  <h1 className="text-[15px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Day :</span> {data.day}</h1>

  <h1 className="text-[12px] flex gap-[8px] font-bold mt-[5px]"><span className="text-red-400  text-[22px]"><FaClock></FaClock></span> {data.start_time} - {data.end_time}</h1>

  <Link to={`/booking/${data.id}`}><button className="bg-red-400 text-white font-semibold rounded-[5px]  py-[3px] mt-[10px] px-[1px] hover:bg-slate-600">Book Apoinment</button></Link>
  
    
    
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