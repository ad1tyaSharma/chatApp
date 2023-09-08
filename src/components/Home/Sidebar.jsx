import React from 'react';

const Sidebar = ({menu,setMenu}) => {
    return (
        <div className='absolute bottom-0 left-0 w-[100vw]'>
            <div className="w-[100vw] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative z-40 bottom-0 bg-white dark:bg-zinc-600 ">
        {/* <div className="hidden lg:my-5 lg:block">
            <a href="index.html" className="block dark:hidden">
                <span>
                    <img src="/public/favicon.png" alt="" className="h-[30px]"/>
                </span>
            </a>
    
            <a href="index.html" className="hidden dark:block">
                <span>
                    <img src="/public/favicon.png" alt="" className="h-[30px]"/>
                </span>
            </a>
        </div> */}
        {/* <!-- end navbar-brand-box -->
    
    
        <!-- Start side-menu nav -->
        <!-- Tabs --> */}
        <div className="w-[100vw] mx-auto lg:my-auto">
            <ul id="tabs" className="w-[100vw] flex flex-row justify-center nav-tabs">
                <li className="flex-grow lg:flex-grow-0">
                    <button id="default-tab" onClick={()=>setMenu(1)}  className="tab-button flex relative items-center justify-center mx-auto h-14 w-14 leading-[14px] hover:bg-zinc-500 dark:text-violet-100/80 group/tab my-2 rounded-lg">
                        <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                            <span className={`relative z-10 p-2 text-xs leading-none text-gray-50 whitespace-no-wrap bg-black rounded shadow-lg`}>Profile</span>
                        </div>
                        <i className={`text-2xl ri-user-2-line ${menu == 1 ? 'text-violet-600' : 'text-gray-300'}`}></i>
                    </button>
                </li>
                <li className="flex-grow lg:flex-grow-0">
                    <button onClick={()=>setMenu(2)}  className="tab-button hover:bg-zinc-500 relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg dark:text-violet-100/80">
                        <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">Chats</span>
                        </div>
                        <i className={`text-2xl ri-message-3-line ${menu == 2 ? 'text-violet-600': 'text-gray-300'}`}></i>
                    </button>
                </li>
                {/* <li className="flex-grow lg:flex-grow-0">
                    <button " className="tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg dark:text-violet-100/80">
                        <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">Groups</span>
                        </div>
                        <i className="text-2xl ri-group-line"></i>
                    </button>
                </li> */}
                <li className="flex-grow lg:flex-grow-0">
                    <button onClick={()=>setMenu(3)}  className="tab-button hover:bg-zinc-500 relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg dark:text-violet-100/80">
                        <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">Contacts</span>
                        </div>
                        <i className={`text-2xl ri-contacts-line ${menu == 3 ? 'text-violet-600' : 'text-gray-300'}`}></i>
                    </button>
                </li>
                <li className="flex-grow lg:flex-grow-0">
                    <button onClick={()=>setMenu(4)} className="tab-button relative hover:bg-zinc-500 flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg active dark:text-violet-100/80">
                        <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                            <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">Settings</span>
                        </div>
                        <i className={`text-2xl ri-settings-2-line ${menu == 4 ? 'text-violet-600' : 'text-gray-300'}`}></i>
                    </button>
                </li>
            </ul>
        </div>
    
        {/* <div className="w-20 my-5 lg:w-auto">
            <ul className="lg:block"> */}
                {/* <li className="hidden text-center light-dark-mode nav-item lg:block">
                    <a href="#" className="hidden dark:block dark:text-violet-100/80">
                        <i className="text-2xl ri-sun-line "></i>
                    </a>
                    <a href="#" className="block text-gray-50 dark:hidden">
                        <i className="text-2xl ri-moon-clear-line"></i>
                    </a>
                </li> */}
    
                {/* <li className="relative lg:mt-4 dropdown lg:dropup">
                    <a href="#" className="dropdown-toggle" id="dropdownButton2" data-bs-toggle="dropdown">
                        <img src="https://placehold.co/400" alt="" className="w-10 h-10 p-1 mx-auto rounded-full bg-gray-50 dark:bg-zinc-700"/>
                    </a>
                
                    <ul className="absolute z-40 float-left w-40 py-2 mx-4 mb-12 text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu bg-clip-padding dark:bg-zinc-700 hidden" aria-labelledby="dropdownButton2" style={{position:'absolute',margin:0,transform : "translate(18px, 935px)",inset : "0px auto auto 0px",}} data-popper-placement="bottom-start">
                        <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right" href="#">Profile <i className="text-gray-500 rtl:float-left ltr:float-right ri-profile-line text-16"></i></a>
                        </li>
                        <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right" href="#">Setting <i className="text-gray-500 rtl:float-left ltr:float-right ri-settings-3-line text-16"></i></a>
                        </li>
                        <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right" href="auth-lock-screen.html">Lock Screen <i className="text-gray-500 rtl:float-left ltr:float-right ri-git-repository-private-line text-16"></i></a>
                        </li>
                        <li className="my-2 border-b border-gray-100/20"></li>
                        <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right" href="auth-login.html">Log out <i className="text-gray-500 rtl:float-left ltr:float-right ri-logout-circle-r-line text-16"></i></a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div> */}
    
    </div>
        </div>
    );
}

export default Sidebar;
