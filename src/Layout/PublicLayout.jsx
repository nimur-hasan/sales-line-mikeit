import React from 'react'
import PublicAppBar from './PublicAppBar'
import PublicFooter from './PublicFooter'

export default function PublicLayout({children}) {
    return (
        <div className='bg-white min-h-screen'>
            <div className='bg-[#f6c98d15]'>
                <PublicAppBar/>
                {
                    children
                }
                <PublicFooter/>
            </div>
        </div>
    )
}
