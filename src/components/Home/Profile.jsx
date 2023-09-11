import React,{useState,useEffect} from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { db } from "../../firebase";
import {getDoc, doc, } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Modal from './Profile/Modal';
const Profile = ({user,self}) => {
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openInvitation, setOpenInvitation] = useState(false);
    const navigate = useNavigate()
    const handleSignout = async()=>
    {
        toast("Logging you out", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/login')
          }).catch((error) => {
            // An error happened.
            toast.error("Error Logging out", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              console.error(error);
          });
          
    }
    const getUserData = ()=>
    {
        getDoc(doc(db, "users", `${user}`)).then((result) => {
            //console.log(result.data());
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
    
    useEffect(() => {
       if(user)
       {
        getUserData()
       }
    }, [user]);
    return (
        <div className='w-[100vw] flex justify-center items-center h-[95vh] '>
            {
                openInvitation ? <Modal user={user} userData={userData} setUserData={setUserData} setOpenInvitation={setOpenInvitation}></Modal>:<></>
            }
        <div style={{opacity : openInvitation ? 0.4 : 1}} className="flex relative flex-col justify-around items-center lg:w-[80vw] w-[70vw] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex justify-between w-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Profile</h5>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={()=>setShowDropdown  (!showDropdown)} className='text-white px-2  py-1 rounded-full hover:bg-gray-700'>
             <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
            </button>
                {
                    showDropdown ? 
                    <div id="dropdownDots" class="z-10 absolute right-2 top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w- dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                <button onClick={()=>setOpenInvitation(true)} class="block px-4 py-2 ">Invitations</button>
                </li>
                <li>
                <button onClick={handleSignout} class="block px-4 py-2 ">Logout</button>
                </li>
                </ul>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className="flex justify-around items-center flex-col p-2">
                {
                    userData ? <img className='h-16 lg:w-32  w-16 lg:h-32 rounded-full' src={userData.photoURL} alt="profile picture" /> :
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 mb-2">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
                }
                
                
                {
                    userData ? <h5 className='text-xl text-white font-[600]'>{ userData.name }</h5> : (<div role="status" className="max-w-sm animate-pulse"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div></div>)
                }
                <div className={`mb-4 flex items-center`}>
                    {userData ? userData.status == 'idle'?
                    (<span className='w-2 h-2 rounded-full bg-green-600'></span>) :
                    (<span className='w-2 h-2 rounded-full bg-red-600'></span>) : <div role="status" className="max-w-sm animate-pulse"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div></div>
                    }
                    <span className='ml-2 text-white text-md capitalize'>{userData ? userData.status : ""}</span></div>
                <div className='bg-gray-600 lg:w-[75vw] w-[65vw] h-[1px]'></div>
            </div>
            <div className="mt-2 lg:w-[75vw] w-[65vw] rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2">
                <p className='text-lg text-gray-400 font-[500]'>About</p>
                {
                    userData?  <p className='text-md text-gray-200 font-[400]'> { userData.about ? userData.about : "Not Specified"}</p> : 
                    <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-64 mb-4"></div></div>
                }
              
            </div>
            <div className='mt-2 lg:w-[75vw] w-[65vw]'>
                <div className='mt-2 rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2'>
                    <p className='text-lg text-gray-400 font-[500]'>Email</p>
                    {
                        userData ? 
                        <p className='text-md text-gray-200 font-[400]'>{userData.email ? userData.email : "Not Specified" }</p>
                        :
                        <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div></div>

                    }
                </div>
                <div className='mt-2 rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2'>
                <p className='text-lg text-gray-400 font-[500]'>Phone Number</p>
                {
                    userData ? 
                    <p className='text-md text-gray-200 font-[400]'>{ (userData.phoneNumber ? userData.phoneNumber : "Not specified")}</p>:
                    <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24 mb-4"></div></div>

                }
                </div>
                <div className='mt-2 rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2'>
                <p className='text-lg text-gray-400 font-[500]'>Birthday</p>
                {userData ? <p className='text-md text-gray-200 font-[400]'>{(userData.birthday ? userData.birthday : "Not specified")  }</p>:
                <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24 mb-4"></div></div>
                }
                </div>
                
            </div>
            <div>

            </div>
        </div>
        </div>

    );
}

export default Profile;
