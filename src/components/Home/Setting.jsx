import React,{useState,useEffect} from 'react';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { toast } from 'react-hot-toast';
import {getDoc, doc, } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Upload } from '@mui/icons-material';
const Setting = ({user}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState(null);
    const [openProfile, setOpenProfile] = useState(true);
    const [imageInput, setImageInput] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
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
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="overflow-y-auto flex relative flex-col  items-center lg:w-[80vw] w-[70vw] h-[80vh] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
            <div className='lg:w-[75vw] w-[65vw] flex justify-between items-center my-5'>
                <h1 className='text-3xl font-bold text-gray-200'>Settings</h1>
                <button onClick={handleSignout} className='text-gray-200'>
                    <LogoutIcon></LogoutIcon>
                </button>
            </div>
          <button
            onClick={()=>setOpenProfile(!openProfile)}
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            class={`flex justify-between items-center lg:w-[75vw] w-[65vw] text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium ${openProfile ? `rounded-tr-lg rounded-tl-lg` : "rounded-lg"} text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 `}
            type="button"
          >
            Profile{" "}
            {
                openProfile ? 
                <ExpandLessIcon></ExpandLessIcon>
                :
                <ExpandMoreIcon></ExpandMoreIcon>
            }
          </button>

          {
            openProfile?
            <div
            id="dropdown"
            class="z-10 lg:w-[75vw] w-[65vw] bg-white divide-y divide-gray-100 rounded-br-lg rounded-bl-lg shadow  dark:bg-gray-700 p-6">
             <div>
            
            <div className="flex justify-around items-center flex-col p-2">
                {
                    userData ? <div className='flex flex-col p-3 border dark:border-gray-500 rounded-lg dark:bg-gray-600 '> <img className='h-16 lg:w-32  w-16 lg:h-32 rounded-full' src={userData.photoURL} alt="profile picture" />
                        <div className='my-2 flex items-center justify-around text-white'>
                            <input type="file" name="image" id="image" className='hidden' value={imageInput} onChange={e=>setImageInput(e.target.value)} />
                            {
                                !imageInput ? 
                                <button className='hover:text-blue-600'><EditIcon></EditIcon></button>
                                :
                                <button className='hover:text-blue-600'><Upload></Upload></button>
                            }
                            <button disabled={imageInput ? false : true} style={{opacity : imageUrl ? 1 : 0.5}} className='hover:text-blue-600'><SaveIcon></SaveIcon></button>
                        </div>
                     </div>:
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
                    <p className='text-lg text-gray-400 font-[500]'>Username {userData && !userData.username ? <span className='italic text-xs'>(if username is not specified, you'll not be discovered in search)</span> : <></>}</p>
                    {
                        userData ? 
                        <p className='text-md text-gray-200 font-[400]'>{userData.username ? userData.username : "Not Specified" }</p>
                        :
                        <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div></div>

                    }
                </div>
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
                
                
            </div>
            <div>

            </div>
            </div>
          </div>
           : 
           <></>
          }

          {/* <div>
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
                    <p className='text-lg text-gray-400 font-[500]'>Username {userData && !userData.username ? <span className='italic text-xs'>(if username is not specified, you'll not be discovered in search)</span> : <></>}</p>
                    {
                        userData ? 
                        <p className='text-md text-gray-200 font-[400]'>{userData.username ? userData.username : "Not Specified" }</p>
                        :
                        <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div></div>

                    }
                </div>
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
                
                
            </div>
            <div>

            </div>
            </div>
            <div className='mt-5'>
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
                    <p className='text-lg text-gray-400 font-[500]'>Username {userData && !userData.username ? <span className='italic text-xs'>(if username is not specified, you'll not be discovered in search)</span> : <></>}</p>
                    {
                        userData ? 
                        <p className='text-md text-gray-200 font-[400]'>{userData.username ? userData.username : "Not Specified" }</p>
                        :
                        <div role="status" className="max-w-sm animate-pulse mt-1"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div></div>

                    }
                </div>
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
                
                
            </div>
            <div>

            </div>
            </div> */}
        </div>
      </div>
    );
}

export default Setting;
