import React from 'react';

const Modal = ({email,setEmail,setResetModal}) => {
    return (
        <div className='flex-col absolute opacity-100 z-10 items-center lg:w-[30vw] w-[70vw] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700'>
            <p className='text-white font-[500] my-2'>Recover your Account</p>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='mt-2 block w-full py-4 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your email' />
            <button onClick={()=>{
                
                    setResetModal(false)
                
            }} className="mt-2 flex justify-between items-center rounded-lg text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium  text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Submit</button>
        </div>
    );
}

export default Modal;
