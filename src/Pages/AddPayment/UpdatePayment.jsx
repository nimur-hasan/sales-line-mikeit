import React, {useContext, useState} from 'react'
import {Update} from '../../Adapters/xhr';
import {toast} from 'react-toastify';
import SubmitButton from '../../components/Buttons/SubmitButton';
import CustomTextField from '../../components/InputFields/CustomTextField';
import {UserContext} from '../../App';

export default function UpdatePayment({updateData, setOpen}) {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [formValues, setFormValues] = useState({})

    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const newFormValues = formValues;
        newFormValues[e.target.name] = e.target.value;
        setFormValues(newFormValues)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await Update(`payment/updatePayment/${updateData._id}`, {
                ...formValues,
                token: loggedInUser.user_token
            })

            toast.success("Payment updated successfull.")
            setLoading(false)
            setOpen(false)
        } catch (error) {
            toast.warn("Try Again!")
            setLoading(false)
            setOpen(false)
        }

        console.log({formValues})

    }

    const [selectedCustomer, setSelectedCustomer] = React.useState('');
    const [selectedProduct, setSelectedProduct] = React.useState('');

    const selectHandleChangeCustomer = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const selectHandleChangeProduct = (event) => {
        setSelectedProduct(event.target.value);
    };


    return (
        <div className='w-[500px] p-5 mx-auto'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <h1 className='text-center text-2xl '>Update Daily Sales</h1>

                <CustomTextField value={updateData.description} name="description" onChange={handleChange}
                                 label="Description" required={false}/>
                <CustomTextField value={updateData.amount} name="amount" onChange={handleChange} label="Amount"
                                 required={true} type="number"/>
                <CustomTextField value={updateData.invoice_no} name="invoice_no" onChange={handleChange}
                                 label="Invoice No." required={false}/>
                <CustomTextField value={updateData.note} name="note" onChange={handleChange} label="Note"
                                 required={false}/>


                <SubmitButton loading={loading}/>
            </form>
        </div>
    )
}
