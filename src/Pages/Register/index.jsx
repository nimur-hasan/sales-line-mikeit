import {Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify';
import {register} from '../../Adapters/auth/register';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { Link } from 'react-router-dom'

export default function Register() {

    const history = useHistory()

    const [formValues, setFormValues] = useState({});
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const newFormValues = formValues;
        newFormValues[event.target.name] = event.target.value;
        setFormValues(newFormValues);
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log({formValues})
        setLoading(true)

        try {

            const response = await register("register", {...formValues, isAdmin})
            if (response?.data?.secret_code === true) {
                toast.success("Admin Register Successfull")
                history.push('/login')
            } else if (response?.data?.secret_code === false) {
                toast.warn("Admin Secret Code not Matched")
            } else if (response?.data?.secret_code == null) {
                toast.success("User Register Successfull")
                history.push('/login')
            }
            setLoading(false)

        } catch (error) {
            toast.warn("Register Failed. Try Again")
            setLoading(false)
        }
    }


    const handleAdminChange = (e) => {
        setIsAdmin(e.target.checked)
    }

    return (
        // <div className='container mx-auto bg-white min-h-screen md:my-20'>
        //     <div className='container mx-auto'>
        //         <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
        //             <div className='hidden md:col-span-1 bg-[#62503830] h-screen md:flex justify-cesnter items-center'>
        //                 <div>
        //                     <h1 className='ml-10 font-semibold text-[50px] leading-[80px]'>Sign Up</h1>
        //                     <img src='/img/salsline-big-logo.png' alt="salsline-big-logo.png"/>
        //                 </div>
        //             </div>
        //             {/* login fomr */}
        //             <div className='md:col-span-1'>
        //                 <div className='mx-auto px-10 md:px-20 mt- '>
        //                     <form className='flex flex-col' onSubmit={handleSubmit}>
        //                         <h1 className='text-center text-2xl mt-[70px]'>Register</h1>
        //                         <CustomTextField name="username" onChange={handleChange} label="Username" type='text'
        //                                          required={true}/>
        //                         <CustomTextField name="organisation" onChange={handleChange} label="Organisation"
        //                                          type='text' required={true}/>
        //                         <CustomTextField name="email" onChange={handleChange} label="Email" type='email'
        //                                          required={true}/>
        //                         <CustomTextField name="password" onChange={handleChange} label="Password"
        //                                          type='password' required={true}/>
        //                         {
        //                             isAdmin &&
        //                             <CustomTextField name="secret_code" onChange={handleChange} label="Secret Code"
        //                                              required={true}/>
        //                         }
        //                         <SubmitButton loading={loading}/>
        //                     </form>
        //                     <div className='flex justify-center mt-5'>
        //                         <FormGroup>
        //                             <FormControlLabel control={<Checkbox onChange={handleAdminChange}/>}
        //                                               label="Is Admin"/>
        //                         </FormGroup>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='bg-[#003358] h-screen'>
            <div style={{backgroundImage: `url('/assets/auth-cover-art.png')`}} className='bg-[#003358] flex items-center bg-no-repeat bg-cover min-h-screen'>
            <div className='container w-full mx-auto p-[32px] flex justify-center'>
                    <div className='bg-white w-full md:w-[770px] min-h-[769px] rounded-2xl md:rounded-[78px] py-[44px] px-4 md:px-[110px]'>
                        <form>
                            <div className='flex justify-center md:justify-end text-[16px] md:text-[20px] font-[Roboto-Slab] text-black text-opacity-50'>
                                <select>
                                    <option>English (UK)</option>
                                </select>
                            </div>
                            <h1 className='text-[36px] font-[Ramabhadra] text-[#212121] font-black text-center mt-[40px] md:mt-[68px]'>CREATE AN ACCOUNT</h1>
                            <div className='grid grid-cols-2 gap-4 md:gap-[36px] mt-[32px]'>
                                <div className='col-span-2 md:col-span-1 flex items-center gap-[14px] cursor-pointer border border-[#BCBCBC] rounded-[20px] py-2.5 px-4'>
                                    <FcGoogle className='h-[36px] w-[36px]'/>
                                    <span className='text-[15px] text-[#747474]'>Sign up with Google</span>
                                </div>
                                <div className='col-span-2 md:col-span-1 flex items-center cursor-pointer gap-[14px] border border-[#BCBCBC] rounded-[20px] py-2.5 px-4'>
                                    <BiLogoFacebookCircle className='h-[36px] w-[36px] text-blue-600'/>
                                    <span className='text-[15px] text-[#747474]'>Sign up with Facebook</span>
                                </div>
                            </div>

                            <div className="flex justify-center mt-[42px]">
                                <div className='flex items-center gap-3'>
                                    <div className='bg-[#979797] h-[1px] w-[60px]'></div>
                                    <div className='text-[#979797]'>OR</div>
                                    <div className='bg-[#979797] h-[1px] w-[60px]'></div>                                
                                </div>
                            </div>
                            <CustomTextField className={'w-full'} name="username" onChange={handleChange} label="Username" type='text'
                                                 required={true}/>
                            <CustomTextField className={'w-full'} name="organisation" onChange={handleChange} label="Organisation"
                                                 type='text' required={true}/>
                            <CustomTextField className={'w-full'} name="email" onChange={handleChange} label="Email" type='email'
                                             required={true}/>
                            <div className='mt-[35px]'>
                            <CustomTextField className={'w-full'} name="password" onChange={handleChange} label="Password" type='password'
                                             required={true}/>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleAdminChange}/>}
                                                      label="Is Admin"/>
                                </FormGroup>
                            </div>
                            <div className="flex justify-center">
                                <button disabled={loading} type='submit' className='text-[20px] mt-[18px] font-bold text-white py-[18px] px-[74px] bg-[#B38B00] rounded-[20px]'>
                                    Create Account
                                </button>
                            </div>

                            <p className='text-[15px] text-[#747474] text-center mt-[15px]'>Already have an account? <Link to="/login">Log in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
