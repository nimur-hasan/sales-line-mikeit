import React, {useState} from 'react'

export default function Pricing() {
    const [isMonthly, setIsMonthly] = useState(false);
    return (
        <div className='bg-white'>
            <div className="container mx-auto py-20">
                {/* tab */}
                <div className='flex justify-center'>
          <span className="shadow-md rounded-md bg-green py-[16px] md:py-[20px] px-[20px]">
            <span onClick={() => setIsMonthly(true)}
                  className={`transition-all hover:cursor-pointer rounded-md md:text-[17px] leading-[30px] font-medium px-[25px] md:px-[40px] py-[13px] ${isMonthly && 'bg-[#625038] text-white'}`}>Bill Monthly</span>
            <span onClick={() => setIsMonthly(false)}
                  className={`transition-all hover:cursor-pointer rounded-md md:text-[17px] leading-[30px] font-medium px-[25px] md:px-[40px] py-[13px] ${!isMonthly && 'bg-[#625038] text-white'}`}>Bill Yearly</span>
          </span>
                </div>

                {/* Pricing Card */}
                <div className='grid md:grid-cols-1 grid-cols-3 md:space-x-5 mt-20 items-center px-5 md:px-0'>
                    {/* Card 1 */}
                    <div className="col-span-3 md:col-span-1">
                        <div className='border-2 border-[#F6C88D] rounded-xl py-[40px] px-[20px]'>
                            <h1 className='font-semibold text-black text-[30px] leading-[45px] text-center'>Basic</h1>
                            <p className='mt-[3px] text-[18px] leading-[27px] text-[#A6A6A6] text-center'>Have a go and
                                test your superpowers</p>
                            <div className='text-center'>
                                <h2 className="before:content-['$'] before:text-[18px] before:text-[#A6A6A6] before:leading-[34px] inline-block relative before:absolute before:-top-6 before:-left-3 text-[#191A15] mt-[30px] text-[50px] leading-[30px] font-[Inter] font-medium text-center">78</h2>
                            </div>
                            {/* Props Crons */}
                            <div className='bg-[#F9FAFB] mt-[31px] py-[28px] px-[37px] rounded-xl'>
                                <ul>
                                    <li className='flex items-center'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>2 Users</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>2 Files</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Public Share & Comments</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Chat Support</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>New income apps</span>
                                    </li>
                                </ul>
                                <div className='flex justify-center mt-[27px]'>
                                    <button
                                        className='text-[#F6C88D] px-5 md:px-[60px] py-3 md:py-[17px] text-[18px] leading-[30px] font-semibold bg-white rounded-xl shadow-md '>Signup
                                        for free
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col-span-3 my-5 md:mt-0 md:col-span-1" style={{
                        backgroundImage: `url('/pro_bg.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow: 'hidden'
                    }}>
                        <div className='border-2 border-[#F6C88D] rounded-xl py-[40px] px-[20px]'>
                            <h1 className='font-semibold text-white text-[30px] leading-[45px] text-center'>Pro</h1>
                            <p className='mt-[3px] text-[18px] leading-[27px] text-white text-center '>Experiment the
                                power of infinite possibilities</p>
                            <div className='text-center'>
                                <h2 className="before:content-['$'] before:text-[18px] before:text-[white] before:leading-[34px] inline-block relative before:absolute before:-top-6 before:-left-3 text-white mt-[50px] text-[50px] leading-[30px] font-[Inter] font-medium text-center">8</h2>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    className='text-white text-center text-[14px] font-semibold leading-[30px] px-[10px] py-[5px] mt-[16px] rounded-xl'>Save
                                    $50 a year
                                </button>
                            </div>
                            {/* Props Crons */}
                            <div className='bg-[#F9FAFB] mt-[31px] py-[28px] px-[37px] rounded-xl'>
                                <ul>
                                    <li className='flex items-center'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>4 Users</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>All apps</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Unlimited editable exports</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Folders and collaboration </span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>All incoming apps</span>
                                    </li>
                                </ul>
                                <div className='flex justify-center mt-[27px]'>
                                    <button
                                        className='text-[#F6C88D] px-5 md:px-[60px] py-3 md:py-[17px] text-[18px] leading-[30px] font-semibold bg-white rounded-xl shadow-md '>Go
                                        to pro
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col-span-3 md:col-span-1">
                        <div className='border-2 border-[#F6C88D] rounded-xl py-[40px] px-[20px]'>
                            <h1 className='font-semibold text-black text-[30px] leading-[45px] text-center'>Platinum</h1>
                            <p className='mt-[3px] text-[18px] leading-[27px] text-[#A6A6A6] text-center'>Unveil new
                                superpowers and join the Design Leaque</p>
                            <div className='text-center'>
                                <h2 className="before:content-['$'] before:text-[18px] before:text-[#A6A6A6] before:leading-[34px] inline-block relative before:absolute before:-top-6 before:-left-3 text-[#191A15] mt-[30px] text-[50px] leading-[30px] font-[Inter] font-medium text-center">16</h2>
                            </div>
                            {/* Props Crons */}
                            <div className='bg-[#F9FAFB] mt-[31px] py-[28px] px-[37px] rounded-xl'>
                                <ul>
                                    <li className='flex items-center'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>All the features of pro plan</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Account success Manager</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Single Sign-On (SSO)</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Co-conception pogram</span>
                                    </li>
                                    <li className='flex items-center mt-[26px]'><img src='/img/right_sign.png'/> <span
                                        className='ml-[10px] font-medium text-[16px] text-[#191A15] leading-[30px]'>Collaboration-Soon</span>
                                    </li>
                                </ul>
                                <div className='flex justify-center mt-[27px]'>
                                    <button
                                        className='text-[#F6C88D] px-5 md:px-[60px] py-3 md:py-[17px] text-[18px] leading-[30px] font-semibold bg-white rounded-xl shadow-md '>Goto
                                        Business
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
