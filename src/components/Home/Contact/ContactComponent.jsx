import React,{useState,useEffect} from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import toast from 'react-hot-toast';
import { db } from '../../../firebase';
import { getDoc,doc, updateDoc,setDoc,collection,query,where,getDocs} from 'firebase/firestore';
import { v4 } from 'uuid';
const ContactComponent = ({contact,userData,user,setUserData,setStage,setMenu}) => {
    const [contactData, setContactData] = useState(null);
    const getUserData = ()=>
    {
        getDoc(doc(db, "users", `${contact}`)).then((result) => {
            console.log(result.data());
            setContactData(result.data())
        }).catch((err) => {
            console.error(err);
            toast.error
   ``         ("Error fetching user", {
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
    const startChat = async()=>
    {
      const channelsCollection = collection(db, 'channels');
      const q = query(channelsCollection, where('members', 'array-contains',user));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if(querySnapshot && !querySnapshot.empty)
      {
        
        querySnapshot.forEach(el=>
            {

                if(el.data().members.includes(contact))
                {
                    setStage(el.id)
                    setMenu(2)
                }
            })
        return
      }
      
        
        // new chat
        const id = v4()
        const collectionRef = doc(db, 'channels',id);
        setDoc(collectionRef, {
            members : [user,contact],
            messages:[]
        })
          .then(async() => {
            console.log("Document successfully written!");
            await updateDoc(doc(db, "users",user ), {
              channels: [...userData.channels,id]
          });
          await updateDoc(doc(db, "users",contact ), {
            channels: [...contactData.channels,id]
        });
        setStage(id)
        setMenu(2)
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
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
                            <button  type="button" className='text-gray-200 my-2 mx-4 hover:text-blue-400' onClick={startChat}><MessageIcon></MessageIcon></button>
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
