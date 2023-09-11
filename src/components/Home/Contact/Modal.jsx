import React,{useState} from 'react';
import { db } from "../../../firebase";
import {getDocs, doc,collection , query, where,updateDoc} from "firebase/firestore";
import { toast } from 'react-hot-toast';

const Modal = ({setOpenModal,user,userData}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const getUser = async()=>
  {
    setSearchResult(null)
    const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("email", "==", searchQuery));
    try {
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty)
        {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc);
                setSearchResult(doc)
                // setSearchResult({...searchResult,uid : doc.id})
                // console.log(searchResult);
              });
        }
        else
        {
            toast.error("User not found", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
        }
    } catch (error) {
        console.error(error);
        toast.error("Error fetching user", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
    }

  }
  const sendInvitation= async()=>
  {
        const data = searchResult.data(); 
      if(user == searchResult.id)
      {
        toast.error("You can't invite yourself", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
      }
      else
      {
        try {
       
            const res =  await updateDoc(doc(db, "users",searchResult.id ), {
                invitations: [...data.invitations,user]
            });
            //console.log(res);
            toast.success("Invitation sent", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
           
            toast.success("Invitation sent", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              setOpenModal(false)
          } catch (error) {
            console.error(error);
            toast.error("Error fetching user", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
          }
      }
  }
    return (
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="bg-[rgba(181, 181, 182, 0.6)] fixed top-0 flex justify-center items-center left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 px-2">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Friend
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={()=>{setOpenModal(false)}}>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
    <div class="relative my-2">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search"  value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by email or username" />
        <button onClick={getUser} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    <div className='h-[20vh] w-full flex flex-col justify-center'>
      {
        searchResult && searchResult.data() ? 
        (<div className="rounded-lg bg-gray-600 shadow w-full p-2 h-[15vh] flex justify-around items-center">
        <img className='rounded-full' src={searchResult.data().photoURL} alt="profileImage" />
        <div className='flex flex-wrap justify-around items-center'>
            <div className='mx-3'>
                <p className='text-gray-200 text-lg font-semibold'>Name</p>
                <p className='text-gray-300'>{searchResult.data().name}</p>
            </div>
            <div className='mx-3'>
                <p className='text-gray-200 text-lg font-semibold'>Email</p>
                <p className='text-gray-300'>{searchResult.data().email}</p>
            </div>
        </div>
      </div>):
      <></>
      }
    </div>
            {/* <!-- Modal footer --> */}
            <div class="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={sendInvitation} disabled={searchResult ? false : true} style={{opacity : `${searchResult ? 1 : 0.5}`}} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </div>
        </div>
    </div>
</div>
    );
}

export default Modal;
