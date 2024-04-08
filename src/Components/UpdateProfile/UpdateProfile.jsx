import { useEffect, useRef, useState } from "react";

import { FaCamera } from "react-icons/fa";

const imageHost = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const imgApi = `https://api.imgbb.com/1/upload?key=${imageHost}`;

const UpdateProfile = () => {
// change img
    const inputRef = useRef(null);

    const [image,setImage] = useState('');

    const [showImagePreview, setShowImagePreview] = useState({});

    console.log(showImagePreview);

const handleImageClick = () => {
    inputRef.current.click();
}

const handleChangeImage = (e) => {
const file = e.target.files[0];

const formData = new FormData();
  formData.append('image', file);


fetch(imgApi,{
    method: 'POST',
    

    body: formData
})
.then(res => res.json())
.then(data => console.log(data));

setImage(file);

}
// get user info

const Atoken = localStorage.getItem('Access token');
const Rtoken = localStorage.getItem('Refresh token');



  const token = {Access : Atoken,refresh : Rtoken};

 

  const [userData,setUserData] = useState([])

  const [newtok,setNewtok] = useState('')


  
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

  

    setNewtok(data.access)
  

  })
  },[setNewtok]);





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



    
  setUserData(data);

  })
  },[newtok,setUserData]);






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
                <img className="h-[200px] w-[200px] rounded-[50%] mx-auto mt-[50px]" src="https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg" alt="" /><FaCamera className="text-[35px] absolute left-[220px] md:left-[440px] lg:left-[900px] top-[240px] text-red-400 bg-slate-200 w-[50px] h-[50px] p-[10px] rounded-[20px]"   onClick={handleImageClick}></FaCamera> 

<input type="file" ref={inputRef} onChange={handleChangeImage}  className="hidden"/> 
                </div>
            }

         
         </div>

{/* update form */}
<div className=" w-[300px] md:w-[500px] mx-auto lg:w-[500px] drop-shadow-lg bg-red-400 mt-[30px] ">
            <form className="p-12">
          <h1 className="backdrop-blur-sm text-4xl pb-8 text-center text-white">Update profile</h1>
                <div className="space-y-5">
                    
                    <div>
                    <label htmlFor="password" className="block text-white">Email</label>
                        <input id="email" type="email" placeholder="Your Email address" className="p-3 block w-full  drop-shadow-lg outline-none" />
                        
                    </div>
                    <div className="flex flex-col  md:flex-row gap-[20px]">
                    
                    <div>
                    <label htmlFor="password" className="block text-white">First Name</label>
                        <input id="pass" type="text" placeholder="" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div>
                    <label htmlFor="password" className="block text-white">Last Name</label>
                        <input id="pass" type="text" placeholder="" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>
                    
                    <div className="flex flex-col  md:flex-row gap-[20px]">
                    <div>
                    <label htmlFor="password" className="block text-white">Gender</label>
                        <input id="pass" type="text" placeholder="MALE | FEMALE" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    
                    <div>
                    <label htmlFor="password" className="block text-white">Blood Group</label>
                        <input id="pass" type="text" placeholder="Use Upper Case" className="p-3 block w-[200px]  drop-shadow-lg outline-none" />
                    </div>
                    </div>
                    
                    <div>
                    <label htmlFor="password" className="block text-white">Date of birth</label>
                        <input id="pass" type="date" placeholder="" className="p-3 block w-full  drop-shadow-lg outline-none" />
                    </div>


                </div>
                {/* button type will be submit for handling form submission*/}
                <button type="button"className="py-2 px-5 mb-4 mt-6 shadow-lg before:block before:-left-1 before:-top-1 before:bg-black before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%]  before:duration-500 before:-z-40 after:block after:-right-1 after:-bottom-1 after:bg-black after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-white relative inline-block">Submit</button>
            </form>
        </div>

        </div>
    );
};

export default UpdateProfile;





// style={{backgroundImage: "url('https://i.ibb.co/Z6yPw9C/Exemplary-Professional-Expertise.jpg')"}}