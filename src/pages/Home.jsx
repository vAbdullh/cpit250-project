import React, { useState } from 'react'
import Map from './Map'
import { Link } from 'react-router-dom';

import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { IoIosHome } from "react-icons/io";
import { IoHelpBuoy } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { TbMenuDeep } from "react-icons/tb";
export default function Home() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="hidden lg:grid place-items-center h-screen w-screen bg-gray-200">
                <p className='text-3xl font-bold text-red-700'>your device is not supported</p>
            </div>
            <div className='lg:hidden container mx-auto p-3 overflow-hidden'>
                <div className='bg-slate-100 w-full mt-5 rounded-lg p-2 flex gap-2'>
                    <IoSearchOutline className='size-7' />
                    <input type="text"
                        placeholder='Search for destination...'
                        className='bg-transparent outline-none ring-transparent text-black placeholder:text-gray-500 flex-1' />
                    <TbMenuDeep
                        onClick={() => setOpen(true)}
                        className={`size-7 transition-all duration-300 ${open ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                </div>
                <div
                    onClick={() => setOpen(false)}
                    className={`h-screen w-screen backdrop-blur-sm absolute top-0 left-0 z-20 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                ></div>
                <div className={`absolute top-0 left-0 bg-slate-800 text-white h-screen w-3/4 max-w-[300px] transition-transform duration-300 z-30 overflow-y-auto ${open ? 'transform-none' : '-translate-x-full'
                    }`}>
                    <div className="p-4">
                        <TfiClose onClick={() => setOpen(false)}
                            className={`size-5 ml-auto transition-all duration-100 ${open ? 'opacity-100 rotate-180' : 'opacity-0 rotate-0'}`} />
                        <ul className="flex flex-col gap-3 py-4 pl-4">
                            <li className="p-4 bg-black rounded-xl flex items-center w-full"><Link className='flex gap-1' to="/"> <IoIosHome className='size-7' />Home</Link></li>
                            <li className="p-4 "><Link className='flex gap-1' to="/docs"><SiGoogledocs className='size-6' />Documentation</Link></li>
                            <li className="p-4 "><Link className='flex gap-1' to="/Help"><IoHelpBuoy className='size-6' />FAQ & Help</Link></li>
                        </ul>
                    </div>
                </div>
                <Map />
            </div>
        </div>
    );
}
