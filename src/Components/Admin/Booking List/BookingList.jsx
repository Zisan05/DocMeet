import { useEffect, useState } from "react";


const BookingList = () => {

const [booklist,setBooklist] = useState([])

const [newtok,setNewtok] = useState('')

const Atoken = localStorage.getItem('Doctor Access token');
const Rtoken = localStorage.getItem('Doctor Refresh token');

  const token = {Access : Atoken,refresh : Rtoken};


  useEffect( () => {
    fetch(`https://pmshosen.pythonanywhere.com/api/doctor/login/refresh/`,{
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




//   geting booking list

useEffect(() => {
    fetch(`https://pmshosen.pythonanywhere.com/api/doctor/book-list/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${newtok}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array or convert it to an array
        const booklistArray = Array.isArray(data) ? data : [data];
        console.log(booklistArray); // Verify the structure of the data received
        setBooklist(booklistArray);
      })
      .catch((error) => {
        console.error("Error fetching book list:", error);
      });
  }, [newtok]);

  console.log(booklist);


  

    return (
        <div>
        <h1 className="text-[40px] font-semibold mt-[30px] text-red-400">DocMeet Booking List</h1>

        <div className="border-2 mt-[20px] w-full ">
           <h1 className="text-[25px] bg-red-400 py-[10px] pl-[30px] text-white font-semibold">Booking List</h1>

           <div>
           <div className="overflow-x-auto ">
<table className="table table-zebra">
{/* head */}
<thead>

<tr> 
    <th  className="text-[25px] border-2 text-center">No</th>
    <th className="text-[25px] border-2 text-center">Patient Name</th>
    <th className="text-[25px] border-2 text-center">Phone Number</th>
    <th className="text-[25px] border-2 text-center">Email</th>
    <th className="text-[25px] border-2 text-center">Day</th>
    <th className="text-[25px] border-2 text-center">Date</th>
    <th className="text-[25px] border-2 text-center">Staring Time</th>
    <th className="text-[25px] border-2 text-center">Ending Time</th>
    <th className="text-[25px] border-2 text-center">Status</th>
  </tr>
</thead>
    {
       booklist.map((item , index) => <tbody>
        {/* row 1 */}
        <tr>
          <th className="border-2 text-center">{index + 1}</th>
          <td className="border-2 text-center">{item.first_name} {item.last_name}</td>
          <td className="border-2 text-center">{item.phone_number}</td>
          <td className="border-2 text-center">{item.email}</td>
          <td className="border-2 text-center">{item.day}</td>
          <td className="border-2 text-center">{item.date}</td>
          <td className="border-2 text-center">{item.start_time} AM</td>
          <td className="border-2 text-center">{item.end_time} PM</td>
          {
            item.is_complete === false ? <td className="border-2 text-center"><button className="bg-slate-600 text-white font-semibold py-[5px] px-[5px] rounded-[3px] hover:bg-red-400">Pending</button></td> : <td className="border-2 text-center"><button className="bg-red-400 text-white font-semibold py-[5px] px-[5px] rounded-[3px] hover:bg-slate-600">Finish</button></td>
          }
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

export default BookingList;