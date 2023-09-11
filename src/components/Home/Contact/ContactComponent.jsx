import React,{useState,useEffect} from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import toast from 'react-hot-toast';
import { db } from '../../../firebase';
import { getDoc,doc, updateDoc} from 'firebase/firestore';
const ContactComponent = ({contact,userData,user,setUserData}) => {
    const [contactData, setContactData] = useState(null);
    const getUserData = ()=>
    {
        getDoc(doc(db, "users", `${contact}`)).then((result) => {
            console.log(result.data());
            setContactData(result.data())
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
    const handleRemoveContact= async()=>
    {
        const data = userData.friends.filter(item => item != contact)
        console.log(data);
        console.log(user);
        try {
            const res =  await updateDoc(doc(db, "users",user), {
                friends : data
            });
            toast.success("Contact removed", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              setUserData({...userData,friends:data})
        } catch (error) {
            console.error(error);
            toast.error("Error removing contact", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
        }

    }
    useEffect(() => {
        getUserData()
        console.log(contact);
    }, []);
    return (
        <div className='w-full p-2 rounded-lg shadow bg-gray-600 my-2'>
            {
                contactData ? 
                    <div className='flex justify-between items-center px-2'>
                            <div className='flex'>
                            <img src={contactData.photoURL} alt="profile image" className='rounded-full h-20 w-20' />
                            <div className='flex flex-col justify-center'>
                            <p className='mx-5 text-gray-300'>{contactData.name}</p>
                            <p className='mx-5 text-gray-300'>{contactData.username}</p>
                            </div>
                            </div>
                            <div>
                            <button  type="button" className='text-gray-200 my-2 mx-4 hover:text-blue-400'><MessageIcon></MessageIcon></button>
                                <button onClick={handleRemoveContact} type="button" className='text-gray-200 m-2 hover:text-red-400'><PersonRemoveIcon></PersonRemoveIcon></button>
                            </div>
                    </div>
                    :
                    <div role="status" class="max-w-sm animate-pulse">
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                    </div>
            }
        </div>
    );
}

export default ContactComponent;
