import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth,db } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Emailsection from './Emailsection';
import Personaldetails from './Personaldetails';
import Profilepicture from './Profilepicture';
import { toast } from 'react-hot-toast';
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { collection, setDoc ,doc} from "firebase/firestore"; 

const Signup = () => {
  const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [step, setStep] = useState(1);
    const handleSignup=async()=>
    {
      createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    try {
      await setDoc(doc(db,"users",`${user.uid}`),{
        name ,
        email,
        phoneNumber :phone,
        photoURL :profileImage,
        isProfilePublic : true,
        status : 'idle',
        channels : [],
        friends: [],
        about:"",
        invitations:[],
        username:""
      })
     } catch (error) {
       console.error(error);
       toast.error(`Error creating new account`, {
        style: {
          borderRadius: "7px",
          background: "#333",
          color: "#fff",
        },
      });
     }
    toast.success("Account created", {
      style: {
        borderRadius: "7px",
        background: "#333",
        color: "#fff",
      },
    });
     
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    toast.error(`Error creating new account (${errorCode})`, {
      style: {
        borderRadius: "7px",
        background: "#333",
        color: "#fff",
      },
    });
    // ..
  });
      navigate('/login')
    }
    return (
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
{
  step == 1 && (<Emailsection email={email} setEmail={setEmail} password={password} setConfPassword={setConfPassword} setPassword={setPassword} confPassword={confPassword} step={step} setStep={setStep}></Emailsection>)
}
{
  step == 2 && (<Personaldetails phone={phone}  name={name} setPhone={setPhone} setName={setName}  step={step} setStep={setStep}></Personaldetails>)
}
{
  step ==3 && (<Profilepicture  profileImage={profileImage} setProfileImage={setProfileImage} handleSignup={handleSignup}></Profilepicture>)
}
</div>   
</div>
   
  </section>
</div>
    );
}

export default Signup;
