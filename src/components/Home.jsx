import React,{useEffect,useState} from 'react';
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';
import Sidebar from './Home/Sidebar';
import Profile from './Home/Profile';
import Contact from './Home/Contact';
const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const [menu, setMenu] = useState(2);
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
        <div className='lg:flex'>
          <Sidebar menu={menu} setMenu={setMenu}></Sidebar>
          {
            menu == 1 ? <Profile self={user.uid} user={user.uid}></Profile> : <></>
          }
          {
            menu == 3 ? <Contact user={user.uid}></Contact> : <></>
          }
        </div>
    );
}

export default Home;
