import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const BookingList = () => {

const [booklist,setBooklist] = useState([])

const [newtok,setNewtok] = useState('')

const navigate = useNavigate();


const Atoken = localStorage.getItem('Doctor Access token');
const Rtoken = localStorage.getItem('Doctor Refresh token');

  const token = {Access : Atoken,refresh : Rtoken};


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




//   geting booking list

useEffect(() => {
    fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/book-list/`, {
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
        // Ensure data is an array or convert it to an array
        const booklistArray = Array.isArray(data) ? data : [data];
         // Verify the structure of the data received
        setBooklist(booklistArray);
      })
      .catch((error) => {
        console.error("Error fetching book list:", error);
      });
  }, [newtok]);

 




  // Confirm appointment list

  const handleconfirm = (id) => {
  

//confirm the book list

fetch('https://mdzisanislam.pythonanywhere.com/api/doctor/book-confirm/', {
  method: "PATCH",
  credentials: "include",
  headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${newtok}`,
  },
  body: JSON.stringify({"id":id}) 
})
.then(res => {          
res.json();

})
.then(data => {
  

console.log(data);

if(data===undefined) {
  Swal.fire({
    title: "Successfull",
    text: "user's appointment book successfully",
    icon: "success",
    
  });


}

// refetch the data 

fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/book-list/`, {
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
    // Ensure data is an array or convert it to an array
    const booklistArray = Array.isArray(data) ? data : [data];
     // Verify the structure of the data received
    setBooklist(booklistArray);
  })
  .catch((error) => {
    console.error("Error fetching book list:", error);
  });


})


  }

// Deleteing the book list

const handleDelete  = (id) => {


  fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/book-delete/${id}/`,{
            method:"DELETE",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${newtok}`
            },
  
        })
        .then(res => res.json())
        .then(data => {
   
          console.log(data);
          if(data === "Successful in deleting a book."){
            Swal.fire({
              title: "Successfull",
              text: "Delete user's appointment successfully",
              icon: "success",
              
            });

          }

// refetch the data 

fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/book-list/`, {
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
    // Ensure data is an array or convert it to an array
    const booklistArray = Array.isArray(data) ? data : [data];
     // Verify the structure of the data received
    setBooklist(booklistArray);
  })
  .catch((error) => {
    console.error("Error fetching book list:", error);
  });

        })
}


// Doctor meet work

const handleMeet = (id) => {

  fetch('https://mdzisanislam.pythonanywhere.com/api/doctor/meet-with-patient/', {
    method: "PATCH",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${newtok}`,
    },
    body: JSON.stringify({"id":id}) 
  })
  .then(res => {          
  res.json();
  
  })
  .then(data => {
    
  
  console.log(data);
  
  if(data===undefined) {
    Swal.fire({
      title: "Successfull",
      text: "User's meet with doctor complete successfully",
      icon: "success",
      
    });

  }


// data refetch

  fetch(`https://mdzisanislam.pythonanywhere.com/api/doctor/book-list/`, {
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
    // Ensure data is an array or convert it to an array
    const booklistArray = Array.isArray(data) ? data : [data];
     // Verify the structure of the data received
    setBooklist(booklistArray);
  })
  .catch((error) => {
    console.error("Error fetching book list:", error);
  });
})

}


  

    return (
        <div>
        <h1 className="text-[40px] font-semibold mt-[30px] text-red-400">DocMeet Booking List</h1>

        <div className="border-2 mt-[20px] ">
           <h1 className="text-[25px] bg-red-400 py-[10px] pl-[30px] text-white font-semibold">Booking List</h1>

           <div>
           <div className="overflow-x-auto h-[520px] ">
<table className="table table-zebra">
{/* head */}
<thead>

<tr> 
    <th  className="text-[20px] border-2 text-center">No</th>
    <th className="text-[20px] border-2 text-center">Patient Name</th>
    <th className="text-[20px] border-2 text-center">Contact</th>
    <th className="text-[20px] border-2 text-center">Email</th>
    <th className="text-[20px] border-2 text-center">Day</th>
    <th className="text-[20px] border-2 text-center">Date</th>
    <th className="text-[20px] border-2 text-center">Start</th>
    <th className="text-[20px] border-2 text-center">End</th>
    <th className="text-[20px] border-2 text-center">Activities</th>
    <th className="text-[20px] border-2 text-center">Activities</th>
    <th className="text-[20px] border-2 text-center">Activities</th>
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
          
           <td className="border-2 text-center">
            {
              item.is_complete === false ? <button onClick={() => handleconfirm(item.id)} className="bg-red-400 text-white font-semibold py-[5px] px-[5px] rounded-[3px] hover:bg-slate-600">Confirm</button> : 
              <h1 className="font-bold text-red-400">Accepted</h1>
            }
           </td>
           <td className="border-2 text-center"><button onClick={() => handleMeet(item.id)} className="bg-slate-600 text-white font-semibold py-[5px] px-[5px] rounded-[3px] hover:bg-red-400">Meet</button></td>

           <td className="border-2 text-center"><button onClick={() => handleDelete(item.id)} className="bg-red-400 text-white font-semibold py-[5px] px-[5px] rounded-[3px] hover:bg-slate-600">Delete</button></td>
          
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