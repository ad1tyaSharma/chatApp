import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    toast("Logging you in", {
      style: {
        borderRadius: "7px",
        background: "#333",
        color: "#fff",
      },
    });
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast.success("Logged in successfully", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error logging in(${errorCode})`, {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  const handleSignInWithGoogle = async () => {
    toast("Logging you in", {
      style: {
        borderRadius: "7px",
        background: "#333",
        color: "#fff",
      },
    });

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        try {
          const data = await getDoc(doc(db, "users", `${user.uid}`));
          if (!data.exists()) {
            await setDoc(doc(db, "users", `${user.uid}`), {
              name: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              isProfilePublic: true,
              status: "idle",
              channels: [],
              friends: [],
              about: "",
              invitations:[],
              username: ""
            });
          }
        } catch (error) {
          console.error(error);
        }
        toast.success("Logged in successfully", {
          style: {
            borderRadius: "7px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate("/");
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
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="m-2">
                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="w-full flex justify-center items-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <div className="m-2 w-full flex justify-between items-center">
                <div
                  className="bg-gray-600 mr-2"
                  style={{ height: "2px", width: "100%" }}
                ></div>
                <p className="text-lgfont-light text-gray-500 dark:text-gray-400">
                  or
                </p>
                <div
                  className="bg-gray-600 ml-2"
                  style={{ height: "2px", width: "100%" }}
                ></div>
              </div>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account?{" "}
                  <NavLink
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
