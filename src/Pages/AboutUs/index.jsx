import React from 'react';

const AboutUs = () => {
    return (
        <div className='bg-white min-h-screen container mx-auto py-[52px] px-4 md:px-0'>
            
            <div className='flex flex-col md:flex-row gap-[67px] items-center justify-center '>                
                <img className='h-[280px] w-[186px]' src="/assets/about1.png" alt="" />
                <div className=''>
                    <h1 className='font-bold text-[#003358] text-[40px] font-[Montserrat] '>About Us</h1>
                    <p className=' text-[#000] text-[20px] font-[Montserrat] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className='h-[1px] mt-[21px] bg-[#003358]'/>

                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-[67px] mt-[100px] md:mt-[20px]  items-center justify-center '>
                <img className='h-[280px] w-[186px]' src="/assets/about2.png" alt="" />
                <div>
                    <h1 className='font-bold text-[#003358] text-[40px] font-[Montserrat] '>What We do</h1>
                    <p className=' text-[#000] text-[20px] font-[Montserrat] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className='h-[1px] mt-[21px] bg-[#003358]'/>

                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-[67px] mt-[100px] md:mt-[20px]  items-center justify-center '>
                
                <img className='h-[280px] w-[186px]' src="/assets/about3.png" alt="" />
                <div>
                    <h1 className='font-bold text-[#003358] text-[40px] font-[Montserrat] '>Our Mission</h1>
                    <p className=' text-[#000] text-[20px] font-[Montserrat] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className='h-[1px] mt-[21px] bg-[#003358]'/>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;