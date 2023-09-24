import React,{useState,useEffect} from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { db } from "../../firebase";
import {getDoc, doc,collection } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import Modal from './Contact/Modal';
import ContactComponent from './Contact/ContactComponent';
const Contact = ({user,setStage,setMenu}) => {
  const [userData, setUserData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getUserData = () => {
    getDoc(doc(db, "users", `${user}`))
      .then((result) => {
        //console.log(result.data());
        setUserData(result.data());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching user", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  useEffect(() => {
    if (user) {
      getUserData();
      //console.log(user);
    }
  }, [user]);
 
    return (
        <div className='w-[100vw] flex justify-center items-center h-[95vh] '>
          {
            openModal ? 
            <Modal user = {user} userData={{...userData}} setOpenModal={setOpenModal}></Modal>:
            <></>
          }
   <div style={{opacity : `${openModal ? 0.2: 1}`}} className="flex flex-col justify-around items-center lg:w-[80vw] w-[70vw] p-6 min-h-[50vh] bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
     <div className="flex justify-between w-full">
       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Contacts</h5>
       <button className='text-white px-2  py-1 rounded-full hover:bg-gray-700' onClick={()=>{setOpenModal(true)}}>
         {userData && userData.friends.length > 0 ? (<PersonAddIcon></PersonAddIcon>) :<></>}
       </button>
     </div>

     <div className='min-h-[65vh] mt-4'>
      
       <div className="mt-8 flex flex-col items-center h-[60vh] lg:w-[75vw] w-[65vw]  p-2 overflow-y-auto">
        {
          userData ? userData.friends.length >0 ?
          userData.friends.map((contact,key)=>{
            return(
              <ContactComponent setStage={setStage} setMenu={setMenu} contact={contact} userData={userData} setUserData={setUserData} user={user}></ContactComponent>
            )
          })
          : 
          <div className='flex flex-col items-center'>
            <p className='text-lg text-gray-400 font-semibold'>You've no friends 🙁</p>
            <button type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{setOpenModal(true)}}>Add Friends</button>

            </div>
          : <div role="status" className="max-w-sm animate-pulse"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div> <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div></div>
        }
       </div>
     </div>
   </div>
 </div>
    );
}

export default Contact;
