import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";


const Category = () => {

    const [CategoryData, setCategoryData] = useState([]);

    

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



const handleDocData = (Category_id) =>  {

  fetch(`https://pmshosen.pythonanywhere.com/api/patient/doctor-list/`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
    },
    
})
.then(res => res.json())
.then(data => {

    
 setDocData(data);

  
})

}


// Recent appointmnets 

const [recent , setRecent ] = useState([]);

useEffect(() => {
  fetch(`https://pmshosen.pythonanywhere.com/api/patient/recent-appointment-list/`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
    },
    
})
.then(res => res.json())
.then(data => {

console.log(data);
setRecent(data);

  
})
},[setRecent])

// appointment card data

const [cardData,setCardData] = useState([]);

const handleCardData = (card_id) => {

  console.log(card_id);
  fetch(`https://pmshosen.pythonanywhere.com/api/patient/appointment-list/?doctor_id=${card_id}`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
    },
    
})
.then(res => res.json())
.then(data => {

    
setCardData(data);

  
})
}

console.log(cardData);
       




  // Doc personal info

  const [DocPersonalInfo,setDocPersonalInfo] = useState({})

const handleDocPersonalInfo = (_id) => {


  fetch(`https://pmshosen.pythonanywhere.com/api/doctor/detail/?id=${_id}`,{
    method:"GET",
    credentials: "include",
    headers: {
        "content-type":"application/json",
    },
    
})
.then(res => res.json())
.then(data => {



setDocPersonalInfo(data);
  
})



} 




const{email,image,name,qualification,specialization} = DocPersonalInfo;





    return (
        <div className=" container mx-auto ">

          {/* category list  */}
            <div className="flex gap-[40px] md:gap-[60px] lg:gap-[120px] overflow-x-auto mt-[50px] " >
           {
            CategoryData.map(data => <div className=" min-w-[100px]" data-aos="flip-right"  data-aos-duration="2000" onClick={() => handleDocData(data.id)}>
                <img className="h-[120px] w-[120px] rounded-[50%] p-[5px]" src={data.picture} alt="" />
                <h1 className="text-[20px] font-bold text-slate-600 md:ml-[10px] lg:ml-[30px]">{data.name}</h1>
            </div>)
           }
        </div>

        {/* Doctor list */}

        {
          docData.length === 0 ? <h1 className="text-[40px] mt-[60px] font-bold text-red-400 text-center underline hidden">Your Doctor</h1> : <h1 className="text-[40px] mt-[60px] font-bold text-red-400 text-center underline">Your Doctor</h1>
        }
        <div className="flex gap-[20px] md:gap-[60px] lg:gap-[100px] overflow-x-auto mt-[20px] ">
           {
            docData.map(data => <div data-aos="flip-down" data-aos-duration="2000" className="mt-[30px] focus:border-b-4 border-b-slate-600  min-w-[150px]"  tabIndex="0" onClick={() => handleCardData(data.id)}>
                <img className="h-[120px] w-[120px] rounded-[50%] ml-[20px]" src={data.picture} alt="" />
                <h1 className="text-[20px] font-bold text-red-400 text-center ">{data.first_name} {data.last_name}</h1>
            </div>)
           }
        </div>


 {/* card list */}

 {
  cardData.length > 0 ? <div>
 <h1 className="text-[40px] mt-[60px] font-bold text-red-400 text-center underline">Doctor Appointments</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-[20px] mt-[50px] ">

  
    {
      cardData.map(data => <div>
           <div data-aos="fade-left" data-aso-duration="2000" className="card card-side bg-gradient-to-r from-red-400 via-white to-white shadow-xl  w-full  h-[270px]  pl-[10px] items-center mb-[20px]">
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

<Link to={`/booking/${data.id}`}><button className="bg-red-400 text-white font-semibold rounded-[5px]  py-[3px] mt-[10px] px-[8px] hover:bg-slate-600">Book Apoinment</button></Link>



</div>

</div>

        </div>)
    }
</div>
  </div> : ""
 }


{/* Recent time appointment */}

<h1 className="text-[40px] mt-[60px] font-bold text-red-400 text-center underline">Recent Doctor Appointments</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-[20px] mt-[50px] ">
{
  recent.map(re => (   <div data-aos="fade-left" data-aso-duration="2000" className="card card-side bg-gradient-to-r from-red-400 via-white to-white  shadow-xl  w-full  h-[270px]  pl-[10px] items-center mb-[20px]">
  <figure  onClick={() => handleDocPersonalInfo(re.id)}><img onClick={()=>document.getElementById('my_modal_1').showModal()} className="h-[150px] w-[150px] rounded-[10px]" src={re.doctor_detail.picture} alt=""/></figure>

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
  <h1 className="text-[18px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Dr: </span> {re.doctor_detail.first_name} {re.doctor_detail.last_name}</h1>

  <h1 className="text-[15px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Date :</span> {re.date}</h1>

  <h1 className="text-[15px] text-red-400 font-semibold"><span className="text-slate-600 font-bold">Day :</span> {re.day}</h1>

  <h1 className="text-[12px] flex gap-[8px] font-bold mt-[5px]"><span className="text-red-400  text-[22px]"><FaClock></FaClock></span> {re.start_time} - {re.end_time}</h1>

  <Link to={`/booking/${re.id}`}><button className="bg-red-400 text-white font-semibold rounded-[5px]  py-[3px] mt-[10px] px-[8px] hover:bg-slate-600">Book Apoinment</button></Link>
  
    
    
  </div>
 
</div>))
}
</div>

     

        </div>
    );
};

export default Category;



