import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
  deleteDoc
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Edit, Upload } from "@mui/icons-material";
import { v4 } from "uuid";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  GoogleAuthProvider,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithPopup,
} from "firebase/auth";
import Modal from "./Setting/Modal";
const Setting = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [openProfile, setOpenProfile] = useState(true);
  const [imageInput, setImageInput] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [nameChange, setNameChange] = useState(false);
  const [changeAbout, setChangeAbout] = useState(false);
  const [about, setAbout] = useState("");
  const [username, setUsername] = useState("");
  const [usernameChange, setUsernameChange] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneChange, setPhoneChange] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setpassword] = useState("");
  const handleDelete = () => {
    if (authData.providerData[0].providerId == "password") {
      setOpenPasswordModal(true);
      const credential = EmailAuthProvider.credential(authData.email, password);
      reauthenticateWithCredential(authData, credential)
        .then(() => {
          // User re-authenticated.
          deleteUser(authData)
            .then(async() => {
              await deleteDoc(doc(db, "cities", authData.uid));
              toast.success("User Deleted", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              // User deleted.
            })
            .catch((error) => {
              // An error ocurred
              // ...
              toast.error("Error deleting user", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
            });
        })
        .catch((error) => {
          // An error ocurred
          console.error(error);
          toast.error("Please try again", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          // ...
        });
    } else {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          reauthenticateWithCredential(authData, credential)
            .then(() => {
              // User re-authenticated.
              deleteUser(authData)
                .then(async() => {
                  await deleteDoc(doc(db, "users", authData.uid));
                  toast.success("User Deleted", {
                    style: {
                      borderRadius: "7px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                  // User deleted.
                })
                .catch((error) => {
                  // An error ocurred
                  // ...
                  console.error(error);
                  toast.error("Error deleting user", {
                    style: {
                      borderRadius: "7px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                });
            })
            .catch((error) => {
              // An error ocurred
              toast.error("Please try again", {
                style: {
                  borderRadius: "7px",
                  background: "#333",
                  color: "#fff",
                },
              });
              // ...
            });

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          // // The email of the user's account used.
          // const email = error.customData.email;
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          toast.error(`Error logging in, ${errorCode}`, {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          // ...
        });
    }
  };

  const handleSignout = async () => {
    toast("Logging you out", {
      style: {
        borderRadius: "7px",
        background: "#333",
        color: "#fff",
      },
    });
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Error Logging out", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
        console.error(error);
      });
  };
  const getUserData = () => {
    getDoc(doc(db, "users", `${user}`))
      .then((result) => {
        //console.log(result.data());
        setUserData(result.data());
        setName(result.data().name);
        setAbout(result.data().about ? result.data().about : "Not Specified");
        setUsername(
          result.data().username ? result.data().username : "Not Specified"
        );
        setPhoneNumber(
          result.data().phoneNumber
            ? result.data().phoneNumber
            : "Not Specified"
        );
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
  const handleUpload = async () => {
    if (imageInput) {
      const formData = new FormData();
      formData.append("file", imageInput);
      formData.append("public_id", `usersData/${v4()}`);
      formData.append("upload_preset", "chatApp");

      toast("Uploading Image, Please wait!", {
        style: {
          borderRadius: "7px",
          background: "#333",
          color: "#fff",
        },
      });
      // Upload the image to Cloudinary
      fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setImageUrl(data.secure_url);
          console.log(imageUrl);
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
          console.error("Error uploading image:", error);
        });
    } else {
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
  const validateUsername = async () => {
    if (!username || username.length < 3) {
      toast.error("Username not available", {
        style: {
          borderRadius: "7px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    } else {
      const usersRef = collection(db, "users");
      // Create a query against the collection.
      const q = query(usersRef, where("username", "==", username));
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return true;
        } else {
          toast.error("Username not available", {
            style: {
              borderRadius: "7px",
              background: "#333",
              color: "#fff",
            },
          });
          return false;
        }
      } catch (error) {
        console.error(error);
        toast.error("Please try again", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
        return false;
      }
    }
  };
  const handleUpdate = async (field, value) => {
    try {
      console.log(userData);
      await updateDoc(doc(db, "users", user), {
        [field]: value,
      });
      toast.success("Profile Updated", {
        style: {
          borderRadius: "7px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageUpdate = () => {
    setUserData({ ...userData, photoURL: imageUrl });
    handleUpdate("photoURL", imageUrl);
  };
  useEffect(() => {
    if (user) {
      getUserData();
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setAuthData(user);
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user]);
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center relative items-center">
      {openPasswordModal ? (
        <Modal
          password={password}
          setpassword={setpassword}
          setOpenPasswordModal={setOpenPasswordModal}
        ></Modal>
      ) : (
        <></>
      )}
      <div
        style={{ opacity: openPasswordModal ? 0.5 : 1 }}
        className="overflow-y-auto flex relative flex-col  items-center lg:w-[80vw] w-[70vw] h-[80vh] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
      >
        <div className="lg:w-[75vw] w-[65vw] flex justify-between items-center my-5">
          <h1 className="text-3xl font-bold text-gray-200">Settings</h1>
          <button onClick={handleSignout} className="text-gray-200">
            <LogoutIcon></LogoutIcon>
          </button>
        </div>
        <button
          onClick={() => setOpenProfile(!openProfile)}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          class={`flex justify-between items-center lg:w-[75vw] w-[65vw] text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium ${
            openProfile ? `rounded-tr-lg rounded-tl-lg` : "rounded-lg"
          } text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 `}
          type="button"
        >
          Profile{" "}
          {openProfile ? (
            <ExpandLessIcon></ExpandLessIcon>
          ) : (
            <ExpandMoreIcon></ExpandMoreIcon>
          )}
        </button>

        {openProfile ? (
          <div
            id="dropdown"
            class="z-10 lg:w-[75vw] w-[65vw] bg-white divide-y divide-gray-100 rounded-br-lg rounded-bl-lg shadow  dark:bg-gray-700 p-6"
          >
            <div>
              <div className="flex justify-around items-center flex-col p-2">
                {userData ? (
                  <div className="flex flex-col p-3 border dark:border-gray-500 rounded-lg dark:bg-gray-600 ">
                    {" "}
                    <img
                      className="h-16 lg:w-32  w-16 lg:h-32 rounded-full"
                      src={userData.photoURL}
                      alt="profile picture"
                    />
                    <div className="my-2 flex items-center justify-around text-white">
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="hidden"
                        onChange={(e) => setImageInput(e.target.files[0])}
                      />
                      {!imageInput ? (
                        <button
                          className="hover:text-blue-600"
                          onClick={() => {
                            document.getElementById("image").click();
                          }}
                        >
                          <EditIcon></EditIcon>
                        </button>
                      ) : (
                        <button
                          className="hover:text-blue-600"
                          onClick={handleUpload}
                        >
                          <Upload></Upload>
                        </button>
                      )}
                      <button
                        disabled={imageUrl ? false : true}
                        style={{ opacity: imageUrl ? 1 : 0.5 }}
                        onClick={handleImageUpdate}
                        className="hover:text-blue-600"
                      >
                        <SaveIcon></SaveIcon>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 mb-2">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                )}

                {userData ? (
                  <div class="relative mt-2">
                    <input
                      type="text"
                      readOnly={!nameChange}
                      id="search"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      class="block w-full py-4 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search"
                      required
                    />

                    {nameChange ? (
                      <button
                        onClick={() => {
                          setUserData({ ...userData, name });
                          setNameChange(false);
                          handleUpdate("name", name);
                        }}
                        class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <SaveIcon></SaveIcon>
                      </button>
                    ) : (
                      <button
                        onClick={() => setNameChange(true)}
                        class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <EditIcon></EditIcon>
                      </button>
                    )}
                  </div>
                ) : (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  </div>
                )}
                <div className={`mb-4 flex items-center mt-2`}>
                  {userData ? (
                    <div>
                      <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        onClick={() => setShowDropdown(!showDropdown)}
                        class={`w-full capitalize flex justify-between text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium ${
                          showDropdown
                            ? "rounded-tr-lg rounded-tl-lg"
                            : "rounded-lg"
                        } text-sm px-5 py-2.5  items-center dark:bg-blue-600 dark:hover:bg-blue-700`}
                        type="button"
                      >
                        {" "}
                        <p>{userData.status}</p>{" "}
                        <svg
                          class="w-2.5 h-2.5 ml-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      {showDropdown ? (
                        <div
                          id="dropdown"
                          class="z-10  bg-white divide-y divide-gray-100 rounded-br-lg rounded-bl-lg shadow w-full dark:bg-gray-600"
                        >
                          <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                          >
                            <li>
                              <div
                                onClick={() => {
                                  setUserData({ ...userData, status: "idle" });
                                  handleUpdate("status", "idle");
                                  setShowDropdown(false);
                                }}
                                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 dark:hover:text-white"
                              >
                                Idle
                              </div>
                            </li>
                            <li>
                              <div
                                onClick={() => {
                                  setUserData({ ...userData, status: "busy" });
                                  handleUpdate("status", "busy");
                                  setShowDropdown(false);
                                }}
                                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-500 dark:hover:text-white"
                              >
                                Busy
                              </div>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div role="status" className="max-w-sm animate-pulse mt-1">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-64 mb-4"></div>
                    </div>
                  )}

                  <span className="ml-2 text-white text-md capitalize"></span>
                </div>
                <div className="bg-gray-600 lg:w-[75vw] w-[65vw] h-[1px]"></div>
              </div>
              <div className="mt-2 lg:w-[70vw] w-[60vw] rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2">
                <p className="text-lg text-gray-400 font-[500]">About</p>
                {userData ? (
                  <div class="relative">
                    <input
                      type="text"
                      readOnly={!changeAbout}
                      onChange={(e) => setAbout(e.target.value)}
                      id="default-search"
                      value={about}
                      class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Mockups, Logos..."
                    />
                    {changeAbout ? (
                      <button
                        type="submit"
                        onClick={() => {
                          setUserData({ ...userData, about });
                          handleUpdate("about", about);
                          setChangeAbout(false);
                        }}
                        class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <SaveIcon></SaveIcon>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={() => setChangeAbout(true)}
                        class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <EditIcon></EditIcon>
                      </button>
                    )}
                  </div>
                ) : (
                  <div role="status" className="max-w-sm animate-pulse mt-1">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-64 mb-4"></div>
                  </div>
                )}
              </div>
              <div className="mt-2 lg:w-[70vw] w-[60vw]">
                <div className="mt-2 rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2">
                  <p className="text-lg text-gray-400 font-[500]">
                    Username{" "}
                    {userData && !userData.username ? (
                      <span className="italic text-xs">
                        (if username is not specified, you'll not be discovered
                        in search)
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                  {userData ? (
                    <div class="relative">
                      <input
                        type="text"
                        readOnly={!usernameChange}
                        onChange={(e) => setUsername(e.target.value)}
                        id="default-search"
                        value={username}
                        class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                      />
                      {usernameChange ? (
                        <button
                          type="submit"
                          onClick={async () => {
                            setUserData({ ...userData, username });
                            console.log(validateUsername());

                            if ((await validateUsername()) === true) {
                              handleUpdate("username", username);
                              setUsernameChange(false);
                            }
                          }}
                          class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <SaveIcon></SaveIcon>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={() => setUsernameChange(true)}
                          class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <EditIcon></EditIcon>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div role="status" className="max-w-sm animate-pulse mt-1">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
                    </div>
                  )}
                </div>
                <div className="mt-2 rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2">
                  <p className="text-lg text-gray-400 font-[500]">Email</p>
                  {userData ? (
                    <div class="relative">
                      <input
                        readOnly
                        value={userData.email}
                        type="text"
                        id="default-search"
                        class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        class="text-white absolute right-2 bottom-2 opacity-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <Edit></Edit>
                      </button>
                    </div>
                  ) : (
                    <div role="status" className="max-w-sm animate-pulse mt-1">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-4"></div>
                    </div>
                  )}
                </div>
                <div className="mt-2 rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2">
                  <p className="text-lg text-gray-400 font-[500]">
                    Phone Number
                  </p>
                  {userData ? (
                    <div class="relative">
                      <input
                        type="text"
                        readOnly={!phoneChange}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        id="default-search"
                        value={phoneNumber}
                        class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                      />
                      {phoneChange ? (
                        <button
                          type="submit"
                          onClick={async () => {
                            setUserData({ ...userData, phoneNumber });
                            //console.log(validateUsername());

                            handleUpdate("phoneNumber", phoneNumber);
                            setPhoneChange(false);
                          }}
                          class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <SaveIcon></SaveIcon>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={() => setPhoneChange(true)}
                          class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <EditIcon></EditIcon>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div role="status" className="max-w-sm animate-pulse mt-1">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24 mb-4"></div>
                    </div>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <button
          onClick={() => setOpenAccount(!openAccount)}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          class={`mt-3 flex justify-between items-center lg:w-[75vw] w-[65vw] text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium ${
            openAccount ? `rounded-tr-lg rounded-tl-lg` : "rounded-lg"
          } text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 `}
          type="button"
        >
          Account{" "}
          {openAccount ? (
            <ExpandLessIcon></ExpandLessIcon>
          ) : (
            <ExpandMoreIcon></ExpandMoreIcon>
          )}
        </button>
        {openAccount ? (
          <div
            id="dropdown"
            class="z-10 lg:w-[75vw] w-[65vw] bg-white divide-y divide-gray-100 rounded-br-lg rounded-bl-lg shadow  dark:bg-gray-700 p-6"
          >
            <div>
              <div className="mt-2 lg:w-[70vw] w-[60vw] rounded-lg dark:border-gray-400 bg-gray-700 px-4 py-2">
                {authData ? (
                  <div className="lg:w-[70vw] w-[60vw] flex justify-between">
                    <p className="text-white font-[500] text-lg">
                      Delete Account
                    </p>
                    <button
                      type="submit"
                      onClick={handleDelete}
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div role="status" className="max-w-sm animate-pulse mt-1">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-64 mb-4"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Setting;
