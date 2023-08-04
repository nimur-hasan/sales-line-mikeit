import Cookies from 'js-cookie';
import React, {useContext, useState} from 'react'
import {Post} from '../../Adapters/xhr';
import {toast} from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import {useHistory, useLocation} from 'react-router-dom';
import {UserContext} from '../../App';
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { Link } from 'react-router-dom'

export default function Login() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [formValues, setFormValues] = useState({})
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    let {from} = location.state || {from: {pathname: "/"}};
    const history = useHistory()


    const handleChange = (e) => {
        const newFormValues = formValues;
        newFormValues[e.target.name] = e.target.value;
        setFormValues(newFormValues)
    }

    const recordLogin = async (id, token, org, isAdmin) => {

        let userType = "basic"
        try {
            const response = await Post(`getSingleUser/${id}`, {
                token: token,
                id: id
            })
            console.log("isAdmin here >>> :", isAdmin)
            if (isAdmin) {
                userType = "Admin";
            }
            await Post("auditTrail/addAuditTrail", {
                userType: userType,
                token: token,
                organisation: org
            })
            // console.log("adTrailResponse: ", adTrailResponse)

        } catch (error) {
            console.log(error)
            toast.warn("Try Again")
            setLoading(false)
        }
    };

    const loginSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            const response = await Post("login", formValues)
            setLoggedInUser({user_token: response.data.token, user: response.data.user})
            Cookies.set("user_token", response.data.token)
            toast.success("Login successfull.")
            history.push(from)
            setLoading(false)
            // await recordLogin(response.data.user._id,
            //     response.data.token,
            //     response.data.user.organisation,
            //     response.data.user.isAdmin,
            // )
        } catch (error) {
            toast.warn("Email or Password not Matched")
            setLoading(false)
        }

        console.log({formValues})
    }

    return (
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
                            <h1 className='text-[36px] font-[Ramabhadra] text-[#212121] font-black text-center mt-[40px] md:mt-[68px]'>Log In</h1>
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
                            <CustomTextField className={'w-full'} name="email" onChange={handleChange} label="Username or Email Address" type='email'
                                             required={true}/>
                            <div className='mt-4 md:mt-[35px]'>
                                <CustomTextField className={'w-full'} name="password" onChange={handleChange} label="Password" type='password'
                                             required={true}/>
                            </div>
                            <div className="flex justify-center">
                                <button disabled={loading} type='submit' className='text-[20px] mt-[48px] font-bold text-white py-[18px] px-[74px] bg-[#B38B00] rounded-[20px]'>
                                    Log In
                                </button>
                            </div>

                            <p className='text-[15px] text-[#747474] text-center mt-[15px]'>Don’t have an account? <Link to='/register'><span className='text-[#A38348]'>Sign up</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
