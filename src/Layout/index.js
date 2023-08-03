import React from 'react'
import ResponsiveAppBar from './AppBar'
import SideBar from './SideBar'

export default function Layout({children}) {
    return (
        <div>
            <ResponsiveAppBar/>
            <div className='flex'>
                <SideBar/>
                <div className='p-[26px] w-full'>
                    {children}
                </div>
            </div>
            <footer className='py-4 bg-black text-white text-center'>
                All right Reserved - 2022
            </footer>
        </div>
    )
}
