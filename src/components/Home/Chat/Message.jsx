import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import SendIcon from '@mui/icons-material/Send';
import Send from "@mui/icons-material/Send";
const Message = ({ stage, setStage, user }) => {
  const [userData, setUserData] = useState(null);
  const [channels, setChannels] = useState(null);
  var friend;
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    // Sample messages (replace with your actual data)
    {
      text: "Hello there!",
      sentBy: "sender",
      sentAt: "2023-09-20T10:30:00",
      messageId: 1,
    },
    {
      text: "Hi! How can I help you?",
      sentBy: "receiver",
      sentAt: "2023-09-24T02:35:00",
      messageId: 2,
    },
    // Add more messages here
  ]);
  function getTimeInIST(date) {
    // Create a new Date object with the same date and time, but set the timezone offset for IST (UTC+5:30)
    const istDate = new Date(date);
    istDate.setMinutes(date.getMinutes() + 330); // 5 hours and 30 minutes ahead
  
    // Get hours and minutes in IST
    const hoursIST = istDate.getUTCHours();
    const minutesIST = istDate.getUTCMinutes();
  
    // Format hours and minutes with leading zeros if needed
    const formattedHours = hoursIST.toString().padStart(2, '0');
    const formattedMinutes = minutesIST.toString().padStart(2, '0');
  
    // Return the time in IST as a string (HH:MM)
    return `${formattedHours}:${formattedMinutes}`;
  }
  
  const addMessage = () => {
    if (messageInput.trim() === "") return;

    const newMessage = {
      text: messageInput,
      sentBy: "sender",
      sentAt: new Date().toISOString(), // Use the current timestamp
      messageId: messages.length + 1, // Assign a unique messageId
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };
  function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if the input date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }

    // Check if the input date is yesterday
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    // If it's not today or yesterday, return the full date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  function haveDifferentDates(date1, date2) {
    // Compare year, month, and day of the two dates
    const isDifferent =
      date1.getFullYear() !== date2.getFullYear() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getDate() !== date2.getDate();
  
    return isDifferent;
  }
  const getChannelData = (channel) => {
    getDoc(doc(db, "channels", channel))
      .then((result) => {
        //console.log(result.data());
        setChannels(result.data());
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

  const getUserData = (id) => {
    getDoc(doc(db, "users", id))
      .then((result) => {
        console.log(result.data());
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
    if (stage) {
      getChannelData(stage);
      console.log(stage);
    }
  }, [stage]);
  useEffect(() => {
    if (channels && user) {
      console.log(channels);
      friend = channels.members.filter((el, key) => el != user)[0];
      getUserData(friend);
    }
  }, [channels, user]);
  return (
    <div className="w-full relative">
      <div className="w-full p-3 border-b-[1px] border-b-gray-700 flex">
        <button
          onClick={() => setStage(0)}
          className="px-2 py-2 rounded-full hover:bg-gray-600 flex justify-center items-center text-gray-200"
        >
          <ArrowBackIcon></ArrowBackIcon>
        </button>
        {userData ? (
          <div className="w-full flex justify-center items-center">
            <img src={userData.photoURL} alt="" className="h-12 rounded-full" />
            <div className="mx-4 text-gray-200 ">
              <h4 className="font-[600] text-[1.2rem]">{userData.name}</h4>
              {userData.username ? <h5>@{}</h5> : <></>}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div id="messages" className="space-y-4 h-[65vh] p-3">
        {messages.map((message,idx) => (
          <div key={message.messageId}>
            {/* Date Divider */}
          {
            idx == 0 || haveDifferentDates(new Date(messages[idx]), new Date(messages[idx -1])) ?
            <div className="text-center text-gray-500 text-sm">
            {formatDate(new Date(message.sentAt))}
          </div>
          :
            <></>
          }
            {/* Message */}
            <div
              className={`flex items-start ${
                message.sentBy != "sender" ? "" : "justify-end"
              }`}
            >
              <div class="flex gap-2 mb-2">
                <div
                  class={`relative px-5 py-3 text-white rounded-lg  ltr:rounded-bl-none rtl:rounded-br-none  ${
                    message.sentBy != "sender"
                      ? "bg-violet-500 text-white"
                      : "text-gray-200 bg-gray-700"
                  }`}
                >
                  <p class="mb-0">{message.text}</p>
                  <p class="mt-1 mb-0 text-xs text-right text-white/50">
                    <i class="align-middle ri-time-line"></i>{" "}
                    <span class="align-middle">{getTimeInIST(new Date(message.sentAt))}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="flex w-full mt-4 border-t-[1px] border-gray-600 p-3">
      <div class="relative w-full">
        
        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type a message." required/>
        <button type="submit" class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
    </div>
      </div>
    </div>
  );
};

export default Message;
