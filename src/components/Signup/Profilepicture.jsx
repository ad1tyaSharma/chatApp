import React, {useState} from 'react';

const Profilepicture = ({handleSignup, profileImage, setProfileImage}) => {
    const [imageFile, setImageFile] = useState(null);
    const handleImageUpload = () => {
        if (imageFile) {
          const formData = new FormData();
          formData.append('file', imageFile);
          formData.append('public_id', `weblar-contacts/${v4()}`);
          formData.append('upload_preset', 'webalar-assignment');
    
          toast("Uploading Image, Please wait!")
          // Upload the image to Cloudinary
          fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setProfileImage(data.secure_url);
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
        }
      };
    const handleUpload = async(e)=>
    {
        const file = e.target.files[0];
        setImageFile(file)
    }
    const handleDrop = async(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
    
        if (file) {
            setImageFile(file);
        }
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    return (
        
<div className="flex flex-col items-center justify-around w-full p-4" >
    <label htmlFor="dropzone-file"  onDrop={handleDrop}
      onDragOver={handleDragOver} className="uploadContainer p-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG</p>
            {
                imageFile ? <p className="text-xs text-gray-500 dark:text-gray-400">{imageFile.name}</p> : null
            }
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleUpload} />
    </label>
    <div className='mt-4 flex justify-around items-center w-full'><button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">Upload</button>
    <button type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</button></div>
</div>
    );
}

export default Profilepicture;
