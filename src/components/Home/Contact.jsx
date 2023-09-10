import React,{useState,useEffect} from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { db } from "../../firebase";
import {getDoc, doc } from "firebase/firestore";
import { toast } from 'react-hot-toast';
const Contact = ({user}) => {
    const getUserData = ()=>
    {
        getDoc(doc(db, "users", `${user}`)).then((result) => {
            console.log(result.data());
            setUserData(result.data())
        }).catch((err) => {
            console.error(err);
            toast.error
            ("Error fetching user", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
        });
        
    }
    const [userData, setUserData] = useState(null);
    useEffect(() => {
       if(user)
       {
        getUserData()
       }
    }, [user]);
    return (
        <div className='w-[100vw] flex justify-center items-center h-[95vh] '>
   <div className="flex flex-col justify-around items-center lg:w-[80vw] w-[70vw] p-6 min-h-[50vh] bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
     <div className="flex justify-between w-full">
       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Contacts</h5>
       <button className='text-white px-2  py-1 rounded-full hover:bg-gray-700'>
         {userData && userData.friends.length > 0 ? (<PersonAddIcon></PersonAddIcon>) :<></>}
       </button>
     </div>

     <div className='min-h-[45vh] mt-4'>
       <div>
         <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
         <div class="relative">
           <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
             <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
             </svg>
           </div>
           <input type="search" class="block lg:w-[75vw] w-[65vw] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
         </div>
       </div>
     </div>
   </div>
 </div>
    );
}

export default Contact;
