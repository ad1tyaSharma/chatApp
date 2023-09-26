import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Profile = ({ user, setStage, channel }) => {
  const [userData, setUserData] = useState(null);
  const getUserData = () => {
    getDoc(doc(db, "users", user[0]))
      .then((result) => {
        setUserData(result.data());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching user", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);
  return userData ? (
    <div
      onClick={() => setStage(channel)}
      className="w-full p-3 flex items-center justify-between hover:bg-slate-700 rounded-lg my-3 cursor-pointer"
    >
      <div className="flex items-center">
        <img src={userData.photoURL} className="h-12 w-12 rounded-full" alt="" />
        <div className="mx-4 text-gray-200 font-[550]">
          <h4>{userData.name}</h4>
        </div>
      </div>
      <div>
        {userData.username.length > 0 ? (
          <h4 className="text-gray-200 font-[500]">@{userData.username}</h4>
        ) : (
          <></>
        )}
      </div>
      {/* <button className='text-gray-200'><MoreVertIcon></MoreVertIcon></button> */}
    </div>
  ) : (
    <></>
  );
};

export default Profile;
