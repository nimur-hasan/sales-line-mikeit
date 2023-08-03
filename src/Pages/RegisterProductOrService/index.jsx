import React, {useContext, useEffect, useState} from 'react'
import {Post} from '../../Adapters/xhr';
import {toast} from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../App';
import {FormControl, InputLabel} from "@mui/material";

export default function RegisterProductOrService() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [formValues, setFormValues] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const newFormValues = formValues;
        newFormValues[e.target.name] = e.target.value;
        setFormValues(newFormValues)
    }

    const history = useHistory()
    useEffect(() => {
        if (!loggedInUser.user.isAdmin) {
            history.push('/login')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await Post("productOrService/addProductOrService", {
                ...formValues,
                token: loggedInUser.user_token,
                organisation: loggedInUser.user.organisation
            })

            toast.success("Product or Service Register successfull.")
            setLoading(false)
        } catch (error) {
            toast.warn("Try Again!")
            setLoading(false)
        }

        console.log({formValues})
    }

    return (
        <div className='w-[50%] mx-auto'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <h1 className='text-center text-2xl '>Register Product Or Service</h1>
                <CustomTextField name="name" onChange={handleChange} label="Name" required={true}/>
                <CustomTextField name="description" onChange={handleChange} label="Description" required={false}/>
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Expiry Date</InputLabel>
                    <CustomTextField name="expire" onChange={handleChange} type="date" label=" "
                                     required={false}/>
                </FormControl>
                <CustomTextField name="price" onChange={handleChange} label="Cost Price" type='number'
                                 required={false}/>
                <CustomTextField name="quantity" onChange={handleChange} label="Quantity" type="number"
                                 required={false}/>
                <CustomTextField name="unit" onChange={handleChange} label="Units" required={false}/>


                <SubmitButton loading={loading}/>
            </form>
        </div>
    )
}
