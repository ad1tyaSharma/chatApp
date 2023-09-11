import React,{useEffect,useState} from 'react';
import { db } from '../../../firebase';
import { getDoc,doc, updateDoc} from 'firebase/firestore';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
const InviteComponent = ({id,user,setInvites,userData}) => {
    const [data, setData] = useState(null);
    const acceptInvite = async() =>
    {
        const invites = userData.invitations.filter(item => item !== id);
        //setInvites(invites)
        console.log(invites);
        
        try {
            const res =  await updateDoc(doc(db, "users",user), {
                invitations: invites,
                friends : [...userData.friends,id]
            });
            toast.success("Invite accepted", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              setInvites(invites)
        } catch (error) {
            console.error(error);
            toast.error("Error accepting invite", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
        }
    }
    const rejectInvite = async()=>
    {
        const invites = userData.invitations.filter(item => item !== id);
        //console.log(invites);
        try {
            const res =  await updateDoc(doc(db, "users",user), {
                invitations: invites,
            });
            toast.success("Invite rejected", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              setInvites(invites)

        } catch (error) {
            console.error(error);
            toast.error("Error rejecting invite", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
        }
    }
    const getUserData = ()=>
    {
        getDoc(doc(db, "users", `${id}`)).then((result) => {
            //console.log(result.data());
            setData(result.data())
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
        getUserData()
        //console.log(data);
    }, []);
    return (
        <div className='w-full p-2 rounded-lg shadow bg-gray-600 my-2'>
            {
                data ? 
                    <div className='flex justify-between items-center px-2'>
                            <div className='flex'>
                            <img src={data.photoURL} alt="profile image" className='rounded-full h-20 w-20' />
                            <div className='flex flex-col justify-center'>
                            <p className='mx-5 text-gray-300'>{data.name}</p>
                            <p className='mx-5 text-gray-300'>{data.username}</p>
                            </div>
                            </div>
                            <div>
                            <button onClick={acceptInvite} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800"><DoneIcon></DoneIcon></button>
                                <button onClick={rejectInvite} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><CloseIcon></CloseIcon></button>
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

export default InviteComponent;
