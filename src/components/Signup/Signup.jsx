import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import Emailsection from './Emailsection';
import Personaldetails from './Personaldetails';
import Profilepicture from './Profilepicture';
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [step, setStep] = useState(1);
    const handleSignup=async()=>
    {
      console.log("logged");
    }
    function isEmailValid(email) {
        // Regular expression for a basic email pattern
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailPattern.test(email);
      }
    function isPasswordValid(password) {
        // Check for minimum length (e.g., 8 characters)
        if (password.length < 8) {
          return false;
        }
      
        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
          return false;
        }
      
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(password)) {
          return false;
        }
      
        // Check for at least one digit
        if (!/\d/.test(password)) {
          return false;
        }
      
        // Check for at least one special character (e.g., @, #, $, etc.)
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
          return false;
        }
      
        // Password meets all criteria
        return true;
      }
    // const handleSignup = async(e)=>
    // {
    //     e.preventDefault();
    //     if(!name || name.length < 3)
    //     {
    //         toast.error("Invalid Name", {
    //             style: {
    //               borderRadius: "7px",
    //               background: "#333",
    //               color: "#fff",
    //             },
    //           });
    //           return;
    //     }
    //     if (!isEmailValid(email)) {
    //         toast.error("Invalid Email", {
    //           style: {
    //             borderRadius: "7px",
    //             background: "#333",
    //             color: "#fff",
    //           },
    //         });
    //         return;
    //     }
    //     if(!isPasswordValid(password))
    //    {
    //     toast.error("Invalid Password", {
    //         style: {
    //           borderRadius: "7px",
    //           background: "#333",
    //           color: "#fff",
    //         },
    //       });
    //       return;
    //    }
    //    if (confPassword != password) {
    //     toast.error("Passwords doesn't match", {
    //         style: {
    //           borderRadius: "7px",
    //           background: "#333",
    //           color: "#fff",
    //         },
    //       });
    //       return;
    //    }
    //     console.log({
    //         email,
    //         password,
    //         confPassword,name
    //     });
    //     createUserWithEmailAndPassword(auth,name, email, password)
    //       .then((userCredential) => {
    //         // Signed in
    //         const user = userCredential.user;
    //         // ...
    //         console.log(user);
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorMessage);
    //         // ..
    //       });
    // }
    return (
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
{
  step == 1 && (<Emailsection email={email} setEmail={setEmail} password={password} setConfPassword={setConfPassword} setPassword={setPassword} confPassword={confPassword} step={step} setStep={setStep}></Emailsection>)
}
{
  step == 2 && (<Personaldetails phone={phone} username={username} name={name} setPhone={setPhone} setName={setName} setUsername={setUsername} step={step} setStep={setStep}></Personaldetails>)
}
{
  step ==3 && (<Profilepicture profileImage={profileImage} setProfileImage={setProfileImage} handleSignup={handleSignup}></Profilepicture>)
}
</div>   
</div>
   
  </section>
</div>
    );
}

export default Signup;
