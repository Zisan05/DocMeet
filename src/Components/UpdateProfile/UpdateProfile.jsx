import { useEffect, useRef, useState } from "react";

import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";

const imageHost = import.meta.env.VITE_IMAGE_HOSTING_KEY;



const imgApi = `https://api.imgbb.com/1/upload?key=${imageHost}`;

const UpdateProfile = () => {

    
    const navigate = useNavigate();
   

// change img
    const inputRef = useRef(null);

    

    const [image,setImage] = useState('');

  const [sendPhoto,setSendPhoto] = useState("");

   

const handleImageClick = () => {
    inputRef.current.click();
}

const handleChangeImage = (e) => {
const file = e.target.files[0];

// get the url of the image

const formData = new FormData();
  formData.append('image', file);


fetch(imgApi,{
    method: 'POST',
    

    body: formData
})
.then(res => res.json())
.then(data => {
    // get the url that come from img BB 
 
    // save the url in a state
    setSendPhoto(data.data.url);

});


// set the file that come from my pc
setImage(file);

}

console.log(sendPhoto);

// get user info

// get the token that save in local storage
const Atoken = localStorage.getItem('Access token');
const Rtoken = localStorage.getItem('Refresh token');



  const token = {Access : Atoken,refresh : Rtoken};


 

  const [userData,setUserData] = useState([])

  const [newtok,setNewtok] = useState('')


//   use the token to get new token
  useEffect( () => {
    fetch(`https://pmshosen.pythonanywhere.com/api/patient/login/refresh/`,{
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

  console.log(newtok);



// use the new token to get the user info

useEffect( () => {
    fetch(`https://pmshosen.pythonanywhere.com/api/patient/profile/`,{
      method:"GET",
      credentials: "include",
      headers: {
          "content-type":"application/json",
          "Authorization": `Bearer ${newtok}`,
      },
      
      
  })
  .then(res => res.json())
  .then(data => {
    
   console.log(data);

  

  setUserData(data);

  })
  },[newtok,setUserData,setSendPhoto]);

  console.log(sendPhoto);


const {blood_group,date_of_birth,email,first_name,gender,id,last_name,picture,marital_status,occupation,phone_number,nationality,religion,emergency_contact} = userData;

if(sendPhoto === ""){
    setSendPhoto(picture);
  }

// Update the user info



const handleUpdateData = e => {
    e.preventDefault();
        const email = e.target.email.value;
        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const gender = e.target.gender.value;
        const date_of_birth = e.target.date_of_birth.value;
        const blood_group = e.target.blood_group.value;
        const phone_number = e.target.phone_number.value;
        const marital_status = e.target.marital_status.value;
        const occupation = e.target.occupation.value;
        const nationality = e.target.nationality.value;
        const religion = e.target.religion.value;
        const emergency_contact = e.target.emergency_contact.value;

       
    
        const updatedInfo = { 
     
            first_name,email,last_name,gender,blood_group,date_of_birth, picture : sendPhoto,phone_number,marital_status,occupation,nationality,religion,emergency_contact
            
        };

        
        
        console.log(updatedInfo);
        
        const Authentication = newtok; // Assuming newtok holds the authentication token
        
        fetch('https://pmshosen.pythonanywhere.com/api/patient/profile/update/', {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Authentication}`,
            },
            body: JSON.stringify(updatedInfo), 
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
         
            if(data.message === "successfully update your profile") {
                Swal.fire({
                  text: "Are you sure you want to update your profile! ",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Update it!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    ""
                    // Reload the window after the user confirms deletion
                    navigate(location?.state ? location.state : "/profile");
                    window.location.reload();
                    
                  }
                });
                
              }

        })
        .catch(error => {
            Swal.fire({
                title: "Error!",
                text: "please enter the information correctly",
                icon: "error"
            })
        });

          


}



    return (
        <div className="py-[50px]" style={{backgroundImage: "url('https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg')",backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }>
   
          <h1 className="text-[30px] font-bold text-red-400 text-center underline">Your Profile</h1> 



{/* change Image */}
         <div>

            {
                image ? <div>
                    <img className="h-[200px] w-[200px] rounded-[50%] mx-auto mt-[50px]" src={URL.createObjectURL(image)} alt="" /><FaCamera className="text-[35px] absolute left-[220px] md:left-[440px] lg:left-[900px] top-[240px] text-red-400 bg-slate-200 w-[50px] h-[50px] p-[10px] rounded-[20px]"   onClick={handleImageClick}></FaCamera> 

<input type="file" ref={inputRef} onChange={handleChangeImage}  className="hidden"/> 
                </div> : <div>
                <img className="h-[200px] w-[200px] rounded-[50%] mx-auto mt-[50px]" src={picture} alt="" /><FaCamera className="text-[35px] absolute left-[220px] md:left-[440px] lg:left-[890px] top-[350px] text-red-400 bg-slate-200 w-[50px] h-[50px] p-[10px] rounded-[20px]"   onClick={handleImageClick}></FaCamera> 

<input type="file" ref={inputRef} onChange={handleChangeImage}  className="hidden"/> 
                </div>
            }

         
         </div>

{/* update form */}
<div className=" w-[300px] md:w-[500px] mx-auto lg:w-[500px] drop-shadow-lg bg-red-400 mt-[30px] ">
            <form onSubmit={handleUpdateData} className="p-12">
          <h1 className="backdrop-blur-sm text-4xl pb-8 text-center text-white">Update profile</h1>
                <div className="space-y-5">
                    
                    <div>
                    <label className="block text-white">Email</label>
                        <input  type="email" placeholder="Your Email address" name="email" defaultValue={email} className="p-3 block w-full  drop-shadow-lg outline-none" />
                        
                    </div>
                    <div className="flex flex-col  md:flex-row gap-[20px]">
                    
                    <div>
                    <label  className="block text-white">First Name</label>
                        <input type="text" placeholder="First Name" name="first_name" defaultValue={first_name} className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div>
                    <label className="block text-white">Last Name</label>
                        <input  type="text" defaultValue={last_name} name="last_name" placeholder="Last Name" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>
                    
                    <div className="flex flex-col  md:flex-row gap-[20px]">
                    <div>
                    <label className="block text-white">Gender</label>
                        <input type="text" defaultValue={gender} name="gender" placeholder="MALE | FEMALE | OTHER" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div>
                    <label className="block text-white">Blood Group</label>
                        <input  type="text" defaultValue={blood_group} name="blood_group" placeholder="Use Upper Case" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>
                    
                    <div>
                    <label className="block text-white">Date of birth</label>
                        <input  type="text" placeholder="Year-Month-Day" defaultValue={date_of_birth} name="date_of_birth" className="p-3 block w-full  drop-shadow-lg outline-none" />
                    </div>

                    <div className="flex flex-col  md:flex-row lg:flex-row gap-[20px]">
                    <div>
                    <label className="block text-white">Marital Status</label>
                        <input type="text" defaultValue={marital_status} name="marital_status" placeholder="MARRIED | UNMARRIED" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div >
                    <label className="block text-white">Occupation</label>
                        <input  type="text" defaultValue={occupation} name="occupation" placeholder="Occupation" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>

                    <div>
                    <label className="block text-white">Phone Number</label>
                        <input  type="text" placeholder="+880" defaultValue={phone_number} name="phone_number" className="p-3 block w-full  drop-shadow-lg outline-none" />
                    </div>

                    <div className="flex flex-col  md:flex-row gap-[20px]">
                    <div>
                    <label className="block text-white">Religion</label>
                        <input type="text" defaultValue={religion} name="religion" placeholder="religion" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div>
                    <label className="block text-white">Nationality</label>
                        <input  type="text" defaultValue={nationality} name="nationality" placeholder="nationality" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>

                    <div>
                    <label className="block text-white">Emergency Contact</label>
                        <input  type="text" placeholder="+880" defaultValue={emergency_contact} name="emergency_contact" className="p-3 block w-full  drop-shadow-lg outline-none" />
                    </div>


                </div>
                {/* button type will be submit for handling form submission*/}
                <button className="bg-slate-600 mt-[20px] hover:bg-stone-600 text-white px-[10px] py-[10px] font-semibold ">Update</button>
            </form>
        </div>

        </div>
    );
};

export default UpdateProfile;





// style={{backgroundImage: "url('https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg')"}}