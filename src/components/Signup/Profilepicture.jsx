import React, {useState} from 'react';
import { v4 } from 'uuid';
import { toast } from 'react-hot-toast';

const Profilepicture = ({handleSignup, profileImage,setProfileImage}) => {
    const [imageFile, setImageFile] = useState(null);
    const handleImageUpload = () => {
        if (imageFile) {
          const formData = new FormData();
          formData.append('file', imageFile);
          formData.append('public_id', `usersData/${v4()}`);
          formData.append('upload_preset', 'chatApp');
    
          toast("Uploading Image, Please wait!", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          // Upload the image to Cloudinary
          fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setProfileImage(data.secure_url);
              toast.success("Image Uploaded", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
            })
            .catch((error) => {
              toast.error("Upload failed", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              console.error('Error uploading image:', error);
            });
        }
        else
        {
          toast.error("Please choose an image to upload", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          return;
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
{           !profileImage ? (<><svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG</p></>):
            (<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
            <path d="M 32 3 C 16 3 3 16 3 32 C 3 48 16 61 32 61 C 48 61 61 48 61 32 C 61 16 48 3 32 3 z M 32 6 C 46.4 6 58 17.6 58 32 C 58 46.4 46.3 58 32 58 C 17.6 58 6 46.3 6 32 C 6 17.7 17.6 6 32 6 z M 42.4375 24.484375 A 1.5026503 1.5026503 0 0 0 41.416016 24.960938 L 31.013672 35.814453 L 25.501953 29.876953 A 1.5029526 1.5029526 0 1 0 23.298828 31.921875 L 29.798828 38.921875 A 1.5026503 1.5026503 0 0 0 29.837891 38.962891 L 29.9375 39.0625 A 1.5026503 1.5026503 0 0 0 32.083984 39.039062 L 43.583984 27.039062 A 1.5026503 1.5026503 0 0 0 42.4375 24.484375 z"></path>
            </svg>)
            }
            {
                imageFile ? <p className="text-xs text-gray-500 dark:text-gray-400">{imageFile.name}</p> : null
            }
        </div>
        <input id="dropzone-file" disabled={profileImage ? true : false} style={{opacity : `${!profileImage ? 1 : 0.5}`}} type="file" className="hidden" onChange={handleUpload} />
    </label>
    <div className='mt-4 flex justify-around items-center w-full'><button disabled={profileImage ? true : false} style={{opacity : `${!profileImage ? 1 : 0.5}`}}  type="button" onClick={handleImageUpload} className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">Upload</button>
    <button disabled={!profileImage} style={{opacity : `${profileImage ? 1 : 0.5}`}}  onClick={handleSignup} type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</button></div>
</div>
    );
}

export default Profilepicture;
