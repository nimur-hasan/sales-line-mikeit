import React from 'react'
import ResponsiveAppBar from './AppBar'
import SideBar from './SideBar'

export default function Layout({children}) {
    return (
        <div>
            <ResponsiveAppBar/>
            <div className='flex min-h-screen'>
                <SideBar/>
                <div className='p-[26px] bg-white w-full'>
                    {children}
                </div>
            </div>
            <footer className='py-4 bg-black text-white text-center'>
                All right Reserved - 2022
            </footer>
        </div>
    )
}
