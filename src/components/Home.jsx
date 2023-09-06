import React,{useEffect,useState} from 'react';
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';
const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState("");
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
          }).catch((error) => {
            // An error happened.
          });
          
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
            //   const uid = user.uid;
              setUser(user)
              // ...
            } else {
              // User is signed out
              // ...
             handleSignout()
              navigate('/login')
            }
          });
        
       
    }, []);
    return (
        <div>
            {
                user ? user.email : null
            }
            yi
        </div>
    );
}

export default Home;
