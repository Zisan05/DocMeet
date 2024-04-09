import { useEffect, useRef, useState } from "react";

import { FaCamera } from "react-icons/fa";

const imageHost = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const imgApi = `https://api.imgbb.com/1/upload?key=${imageHost}`;

const UpdateProfile = () => {
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
    console.log(data);

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

  console.log(token.Access);
 

  const [userData,setUserData] = useState([])

  const [newtok,setNewtok] = useState('')


//   use the token to get new token
  useEffect( () => {
    fetch(`https://pmshosen.pythonanywhere.com/api/patient/token/refresh/`,{
      method:"POST",
      credentials: "include",
      headers: {
          "content-type":"application/json",
          
      },
      body:  JSON.stringify(token) ,
      
  })
  .then(res => res.json())
  .then(data => {

  console.log(data);

    setNewtok(data.access);

    console.log(newtok);
  

  })
  },[setNewtok]);



// use the new token to get the user info

useEffect( () => {
    fetch(`http://pmshosen.pythonanywhere.com/api/patient/profile/`,{
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
  },[newtok,setUserData]);


const {blood_group,date_of_birth,email,first_name,gender,id,last_name,profile_picture} = userData;



// Update the user info

const handleUpdateData = e => {
    e.preventDefault();
        const email = e.target.email.value;
        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const gender = e.target.gender.value;
        const blood_group = e.target.blood_group.value;
        const date_of_birth = e.target.date_of_birth.value;
    
        const updatedInfo = { 
     
            first_name,email,last_name,gender,blood_group,date_of_birth, picture : sendPhoto
            
        };
        
        console.log(updatedInfo);
        
        const Authentication = newtok; // Assuming newtok holds the authentication token
        
        fetch('http://pmshosen.pythonanywhere.com/api/patient/profile/update/', {
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
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
                <img className="h-[200px] w-[200px] rounded-[50%] mx-auto mt-[50px]" src={`https://pmshosen.pythonanywhere.com/${profile_picture}`} alt="" /><FaCamera className="text-[35px] absolute left-[220px] md:left-[440px] lg:left-[900px] top-[240px] text-red-400 bg-slate-200 w-[50px] h-[50px] p-[10px] rounded-[20px]"   onClick={handleImageClick}></FaCamera> 

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
                        <input type="text" defaultValue={gender} name="gender" placeholder="MALE | FEMALE" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div>
                    <label className="block text-white">Blood Group</label>
                        <input  type="text" defaultValue={blood_group} name="blood_group" placeholder="Use Upper Case" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>
                    
                    <div>
                    <label className="block text-white">Date of birth</label>
                        <input  type="text" defaultValue={date_of_birth} name="date_of_birth" className="p-3 block w-full  drop-shadow-lg outline-none" />
                    </div>


                </div>
                {/* button type will be submit for handling form submission*/}
                <button className="bg-slate-600 mt-[10px] hover:bg-stone-600 text-white px-[10px] py-[10px] font-semibold">Submit</button>
            </form>
        </div>

        </div>
    );
};

export default UpdateProfile;





// style={{backgroundImage: "url('https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg')"}}