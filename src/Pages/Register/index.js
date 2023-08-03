import {Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify';
import {register} from '../../Adapters/auth/register';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';

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
        <div className='container mx-auto bg-white min-h-screen md:my-20'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
                    <div className='hidden md:col-span-1 bg-[#62503830] h-screen md:flex justify-cesnter items-center'>
                        <div>
                            <h1 className='ml-10 font-semibold text-[50px] leading-[80px]'>Sign Up</h1>
                            <img src='/img/salsline-big-logo.png' alt="salsline-big-logo.png"/>
                        </div>
                    </div>
                    {/* login fomr */}
                    <div className='md:col-span-1'>
                        <div className='mx-auto px-10 md:px-20 mt- '>
                            <form className='flex flex-col' onSubmit={handleSubmit}>
                                <h1 className='text-center text-2xl mt-[70px]'>Register</h1>
                                <CustomTextField name="username" onChange={handleChange} label="Username" type='text'
                                                 required={true}/>
                                <CustomTextField name="organisation" onChange={handleChange} label="Organisation"
                                                 type='text' required={true}/>
                                <CustomTextField name="email" onChange={handleChange} label="Email" type='email'
                                                 required={true}/>
                                <CustomTextField name="password" onChange={handleChange} label="Password"
                                                 type='password' required={true}/>
                                {
                                    isAdmin &&
                                    <CustomTextField name="secret_code" onChange={handleChange} label="Secret Code"
                                                     required={true}/>
                                }
                                <SubmitButton loading={loading}/>
                            </form>
                            <div className='flex justify-center mt-5'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleAdminChange}/>}
                                                      label="Is Admin"/>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
