import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const PatientList = () => {

    const [patientList,setPatientlist] = useState([])

const [newtok,setNewtok] = useState('')

const navigate = useNavigate();


const Atoken = localStorage.getItem('Doctor Access token');
const Rtoken = localStorage.getItem('Doctor Refresh token');

  const token = {Access : Atoken,refresh : Rtoken};

// refresh Api
  useEffect( () => {
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
  },[setNewtok]);


//   patient list api


useEffect(() => {
    fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/patient-list/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${newtok}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data);
      
        console.log(data);
        // Ensure data is an array or convert it to an array
        const booklistArray = Array.isArray(data) ? data : [data];
         // Verify the structure of the data received
        setPatientlist(booklistArray);
        
      
      })
      .catch((error) => {
        console.error("Error fetching book list:", error);
      });
  }, [newtok,setPatientlist]);





    return (
        <div>
        <h1 className="text-[40px] font-semibold mt-[30px] text-red-400">DocMeet Patient List</h1>

        <div className="border-2 mt-[20px] ">
           <h1 className="text-[25px] bg-red-400 py-[10px] pl-[30px] text-white font-semibold">Patient List</h1>

           <div>
           <div className="overflow-x-auto ">
<table className="table table-zebra">
{/* head */}
<thead>

<tr> 
    <th  className="text-[20px] border-2 text-center">No</th>
    <th className="text-[20px] border-2 text-center">Patient Name</th>
    <th className="text-[20px] border-2 text-center">Contact</th>
    <th className="text-[20px] border-2 text-center">Email</th>
    <th className="text-[20px] border-2 text-center">Gender</th>
    <th className="text-[20px] border-2 text-center">Date of birth</th>
    <th className="text-[20px] border-2 text-center">Blood group</th>
    <th className="text-[20px] border-2 text-center">Marital status</th>
    <th className="text-[20px] border-2 text-center">Emergency contact</th>
   
  </tr>
</thead>
    {
       patientList.map((patient, index) => <tbody>
        {/* row 1 */}
        <tr>
          <th className="border-2 text-center">{index + 1}</th>
          <td className="border-2 text-center">{patient.first_name} </td>
           <td className="border-2 text-center">{patient.phone_number}</td>
          <td className="border-2 text-center">{patient.email}</td>
          <td className="border-2 text-center">{patient.gender}</td>
          <td className="border-2 text-center">{patient.date_of_birth}</td>
          <td className="border-2 text-center">{patient.blood_group}</td>
          <td className="border-2 text-center">{patient.marital_status}</td> 
          <td className="border-2 text-center">{patient.emergency_contact}</td> 
          
          
        </tr>
       
      </tbody>)
       
    }
 

</table>
</div>
           </div>
        </div>
    </div>
    );
};

export default PatientList;