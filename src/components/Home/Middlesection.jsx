import React from 'react';

const Middlesection = () => {
    return (
        <div className="tab-content active">
                {/* <!-- Start chat content --> */}
                <div>
                    <div className="px-6 pt-6">
                        <h4 className="mb-0 text-gray-700 dark:text-gray-50">Chats</h4>
                
                        <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                            <span className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1 ps-3 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600" id="basic-addon1">
                                <i className="text-lg text-gray-400 ri-search-line search-icon dark:text-gray-200"></i>
                            </span>
                            <input type="text" className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-gray-400" placeholder="Search messages or users" aria-label="Search messages or users" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                
                    {/* <!-- Start user status -->
                    <div className="px-6 pb-6" dir="ltr">
                    
                        <div className="owl-carousel owl-theme owl-loaded owl-drag" id="user-status-carousel">
                            
                            
                    
                            
                    
                            
                    
                            
                    
                        <div className="owl-stage-outer"><div className="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 435px;"><div className="owl-item active" style="width: 71px; margin-right: 16px;"><div className="text-center">
                                <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                    <div className="absolute inset-0 text-center">
                                        <img src="./assets/images/avatar-2.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9">
                                        <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                    </div>
                    
                                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Patrick</h5>
                                </a>
                            </div></div><div className="owl-item active" style="width: 71px; margin-right: 16px;"><div className="text-center">
                                <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                    <div className="absolute inset-0 block text-center">
                                        <img src="./assets/images/avatar-4.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9">
                                        <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                    </div>
                    
                                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Doris</h5>
                                </a>
                            </div></div><div className="owl-item active" style="width: 71px; margin-right: 16px;"><div className="text-center">
                                <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                    <div className="absolute inset-0 block text-center">
                                        <img src="./assets/images/avatar-5.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9">
                                        <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                    </div>
                    
                                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Emily</h5>
                                </a>
                            </div></div><div className="owl-item active" style="width: 71px; margin-right: 16px;"><div className="text-center">
                                <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                    <div className="absolute inset-0 block text-center">
                                        <img src="./assets/images/avatar-6.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9">
                                        <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                    </div>
                    
                                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Steve</h5>
                                </a>
                            </div></div><div className="owl-item" style="width: 71px; margin-right: 16px;"><div className="text-center">
                                <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                    <div className="absolute inset-0 block mx-auto rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                        <span className="font-medium leading-9 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                            T
                                        </span>
                                        <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-1 dark:border-zinc-600"></span>
                                    </div>
                                    <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Teresa</h5>
                                </a>
                            </div></div></div></div><div className="owl-nav disabled"><button type="button" role="presentation" className="owl-prev"><span aria-label="Previous">‹</span></button><button type="button" role="presentation" className="owl-next"><span aria-label="Next">›</span></button></div><div className="owl-dots disabled"></div></div>
                        <!-- end user status carousel -->
                    </div>
                    <!-- end user status --> */}
                    
                    {/* <!-- Start chat-message-list --> */}
                    <div>
                        <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>
                    
                        <div className="h-[610px] px-2 simplebar-scrollable-y" data-simplebar="init"><div className="simplebar-wrapper"  style ={{margin:"0 -8px"}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset"  style={{right:0,bottom:0}}><div className="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content"  style={{height:"100%",overflow:"hidden scroll"}}><div className="simplebar-content"  style={{padding :"0 8px"}}>
                    
                            <ul className="chat-user-list">
                                <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                    <a href="#">
                                        <div className="flex">
                                            <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                                <img src="https://placehold.co/400" className="rounded-full w-9 h-9" alt=""/>
                                                <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                            </div>
                    
                                            <div className="flex-grow overflow-hidden">
                                                <h5 className="mb-1 text-base truncate dark:text-gray-50">Patrick Hendricks</h5>
                                                <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Hey! there I'm available</p>
                                            </div>
                                            <div className="text-gray-500 text-11 dark:text-gray-300">05 min</div>
                                        </div>
                                    </a>
                                </li>
                    
                               
                            </ul>
                        </div></div></div></div><div className="simplebar-placeholder" style={{width: "380px", height:"944px"}}></div></div><div className="simplebar-track simplebar-horizontal"  style={{visibility:'hidden'}}><div className="simplebar-scrollbar"  style={{width:0,display:'none'}}></div></div><div className="simplebar-track simplebar-vertical"  style={{visibility:'visible'}}><div className="simplebar-scrollbar"  style={{height:"394px",transform: "translate3d(0px, 0px, 0px)",display:'block'}}></div></div></div>
                    </div>
                    {/* <!-- End chat-message-list --> */}
                   
                </div>

            </div>
    );
}

export default Middlesection;
