import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDoc, doc,query,collection,where,getDocs} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Message from "./Chat/Message";
import Profile from "./Chat/Profile";
const Chat = ({ user, setMenu, setStage, stage }) => {
  const [userData, setUserData] = useState(null);
  const [channels, setChannels] = useState([]);
  const getChannelData = (channel) => {
    getDoc(doc(db, "channels", channel))
      .then((result) => {
        if(result.data())
        {
          console.log("yes",channel);
          setChannels([...channels, result.data()]);
        }
        console.log("not",channel);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching data", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  const getUserData = () => {
    getDoc(doc(db, "users", `${user}`))
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

  const fetchDocumentsByIds = async (channelIds) => {
    const documents = [];
  
    for (const channelId of channelIds) {
      const channelRef = doc(db, 'channels', channelId); // Replace 'channels' with your collection name
      const channelSnapshot = await getDoc(channelRef);
  
      if (channelSnapshot.exists()) {
        const channelData = channelSnapshot.data();
        documents.push(channelData); // Add the retrieved document data to the array
      }
    }
  
    return documents;
  };
  
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]); //
  useEffect(() => {
    if(userData && userData.channels)
    {
      fetchDocumentsByIds(userData.channels)
      .then((data) => setChannels(data))
      .catch((error) => console.error('Error fetching documents:', error));
    }
  }, [userData]);
  //change
  
  return (
    <div className="w-[100vw] flex justify-center items-center h-[95vh] ">
      <div className="lg:w-[80vw] w-[70vw] min-h-[80vh] bg-white border  border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        {stage == 0 ? (
          <div className="p-6">
            <h1 className="text-[1.7rem] font-bold text-gray-200">Messages</h1>
            <div className="my-4 h-[70vh]  w-full overflow-y-auto">
              {
              userData &&
              channels.length === userData.channels.length ? (
                channels.map((el, key) => {
                  return (
                    <Profile
                      setStage={setStage}
                      channel={userData.channels[key]}
                      user={el.members.filter((e) => e != user)}
                    ></Profile>
                  );
                })
              ) : (
                <div className="h-[70vh] w-full flex justify-center items-center">
                  <div className="" style={{ textAlign: "center" }}>
                    <p className="text-gray-400 font-[500] my-3">
                      You have no Messages
                    </p>
                    <button
                      onClick={() => setMenu(3)}
                      type="button"
                      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Message stage={stage} user={user} setStage={setStage}></Message>
        )}
      </div>
    </div>
  );
};

export default Chat;
