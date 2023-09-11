import React,{useState} from 'react';
import { toast } from 'react-hot-toast';
import {getDocs, doc,collection , query, where,updateDoc} from "firebase/firestore";
import { db } from '../../firebase';
const Personaldetails = ({phone,name,setPhone,setName,step,setStep,username,setUsername}) => {
  const [isUserNameValid, setIsUserNameValid] = useState(0);
  function isPhoneNumberValid(phoneNumber) {
    // Remove all non-numeric characters from the input
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Check if the cleaned phone number matches the North American format
    const phoneNumberPattern = /^(1)?(\d{10})$/;
    
    return phoneNumberPattern.test(numericPhoneNumber);
  }  
  const handleVerify = async()=>
  {
    if(!username || username.length < 3)
    {
      toast.error("Username not available", {
        style: {
          borderRadius: "7px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    else
    {
      const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("username", "==", username));
      try {
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty)
        {
           setIsUserNameValid(true);
           toast.success("Username verified", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
        }
        else
        {
            toast.error("Username not available", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
        }
      } catch (error) {
        console.error(error);
        toast.error("Please try again", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  }
  const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || name.length <3)
        {
          toast.error("Invalid Name", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          return;
        }
        if(!isPhoneNumberValid(phone))
        {
          toast.error("Invalid Phone Number", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          return;
        }
        
        console.log({phone,
          name});
        setStep(step+1)
        }
    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Personal Details
      </h1>
      
      
      <form className="space-y-4 md:space-y-6"  onSubmit={handleSubmit}>
        
      <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} type="text" name="name" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} type="number" name="phone" id="phone" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} type="text" name="username" id="username" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>
        
        {/* <div>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">Password must be 8 characters long</p>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">Password must have atleast one uppercase, one lowercase, one number and one special character.</p>
        </div> */}
        <div className="flex space-x-2">
        <button onClick={handleVerify} type="button" class="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Verify</button>

<button disabled={isUserNameValid ? false : true} style={{opacity: isUserNameValid ? 1 : 0.5}} type="submit" className="w-full flex justify-center items-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-[#4285F4]/55 mr-2 mb-2"> Next
<svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg></button>
        </div>
        
      </form>
    </div>
    );
}

export default Personaldetails;
