import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function HomeAppBar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => {
        setMenuOpen(false)
    }
    return (
        <div className='bg-opacity-0 absolute w-full text-white'>
            <div className='container mx-auto flex justify-between items-start'>
                <NavLink to="/home">
                    <img src="/assets/logo.png" alt="SalesLine Logo" className='pt-[42px] w-[120px]'/>
                </NavLink>
                <div>
                    <ul className='hidden md:flex items-center space-x-10 mt-10'>
                        <li><NavLink
                            className={(isActive) => isActive ? "text-white" : 'text-white'}
                            to="/home">Home</NavLink></li>
                        {/* <li><NavLink  className={(isActive)=> isActive?"text-[#625038] border-b-2 border-[#F6C88D]":'text-black'} to="/pricing">Pricing</NavLink></li> */}
                        <li><NavLink
                            className={(isActive) => isActive ? "text-white" : 'text-white'}
                            to="/about-us">About Us</NavLink></li>
                        <li><NavLink
                            className={(isActive) => isActive ? "text-white" : 'text-white'}
                            to="/contact-us">Contact Us</NavLink></li>
                        <li><NavLink
                            className={(isActive) => isActive ? "text-white" : 'text-white'}
                            to="/login">Login</NavLink></li>
                        <li><NavLink
                            className={(isActive) => isActive ? "text-white" : 'text-white'}
                            to="/register">
                            <button className='bg-[#B38B00] text-white rounded-md px-5 py-2'>Sign Up</button>


                        </NavLink></li>
                    </ul>
                    <div onClick={() => setMenuOpen(!menuOpen)} className='md:hidden mr-5'>

                        {menuOpen ? <CloseIcon/> : <MenuIcon/>}
                    </div>
                    {
                        menuOpen &&
                        <ul className='md:hidden absolute left-0 right-0 transition-all z-50 flex flex-col items-center mt-5 bg-white py-5 space-y-5 shadow-lg'>
                            <li><NavLink onClick={closeMenu}
                                         className={(isActive) => isActive ? "text-[#625038] border-b-2 border-[#F6C88D]" : 'text-black'}
                                         to="/home">Home</NavLink></li>
                            {/* <li><NavLink onClick={closeMenu} className={(isActive)=> isActive?"text-[#625038] border-b-2 border-[#F6C88D]":'text-black'} to="/pricing">Pricing</NavLink></li> */}
                            <li><NavLink onClick={closeMenu}
                                         className={(isActive) => isActive ? "text-[#625038] border-b-2 border-[#F6C88D]" : 'text-black'}
                                         to="/contact-us">Contact Us</NavLink></li>
                            <li><NavLink onClick={closeMenu}
                                         className={(isActive) => isActive ? "text-[#625038] border-b-2 border-[#F6C88D]" : 'text-black'}
                                         to="/register">Register</NavLink></li>
                            <li><NavLink onClick={closeMenu}
                                         className={(isActive) => isActive ? "text-[#625038] border-b-2 border-[#F6C88D]" : 'text-black'}
                                         to="/login">
                                <button className='bg-[#625038] text-white rounded-md px-5 py-2'>Login</button>


                            </NavLink></li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}
