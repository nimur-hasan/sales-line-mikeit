import React, {useState} from 'react'
import {toast} from 'react-toastify';
import {CONTACT_API_URL} from '../../Constants/constants'

export default function ContactUs() {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const updateData = formData;
        updateData[e.target.name] = e.target.value;
        setFormData(updateData);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newData = {
            ...formData,
            entered_fullname: formData.firstName + " " + formData.lastName,
            origin: 'salesline',
            entered_subject: 'Salesline Contact'
        };

        fetch(CONTACT_API_URL, {
            method: 'POST',
            body: JSON.stringify(newData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(result => {
                // console.log("result: ", result)
                toast.success("Message sent")
            }).catch(error => {
            // console.log("error: ", error)
            toast.error("Try Again")
        })


        // console.log(newData)
    }

    return (
        <div className='bg-white my-[90px]'>
            <div className='px-5 md:px-0 container mx-auto'>
                <div className="grid grid-cols-2 md:space-x-5">
                    <div className="col-span-2 md:col-span-1">
                        <h1 className='font-bold text-[40px] leading-[80px] text-[#003358]'>Contact Us</h1>
                        <p className='text-[20px] text-[#003358]'>Our Friendly team would have to hear
                            from you</p>


                        <div className='gap-2.5 flex items-center mt-[28px]'>
                          <img src="/assets/mobile.png" alt="" />  
                          <p className='tex-[20px] text-[#003358]'>+234 (0) 807 787 4589</p>
                        </div>

                        {/* Form */}
                        <form className='mt-[24px] md:mr-20' onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 space-x-5">
                                <div className="col-span-1 flex flex-col justify-start">
                                    <label htmlFor='firstName' className='text-[20px] leading-[32.4px] text-[#003358]'>First
                                        Name</label>
                                    <input name="firstName" onChange={handleChange}
                                           className='rounded-lg p-1 border text-[#003358] border-[#6A6A6A] mt-[12px]' type='text'
                                           required/>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start">
                                    <label htmlFor='lastName' className='text-[20px] leading-[32.4px] text-[#003358]'>Last
                                        Name</label>
                                    <input name="lastName" onChange={handleChange}
                                           className='rounded-lg p-1 border border-[#6A6A6A] mt-[12px]' type='text'
                                           required/>
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start mt-[28px]">
                                <label htmlFor='email'
                                       className='text-[20px] leading-[32.4px] text-[#003358]'>Email</label>
                                <input name='email' onChange={handleChange}
                                       className='rounded-lg p-1 border border-[#6A6A6A] mt-[12px]' type='email'
                                       required/>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start mt-[28px]">
                                <label htmlFor='entered_phone' className='text-[20px] leading-[32.4px] text-[#003358]'>Phone
                                    Number</label>
                                <input name='entered_phone' onChange={handleChange}
                                       className='rounded-lg p-1 border border-[#6A6A6A] mt-[12px]' type='text'
                                       required/>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start mt-[28px]">
                                <label htmlFor='entered_message'
                                       className='text-[20px] leading-[32.4px] text-[#003358]'>Message</label>
                                <textarea name='entered_message' onChange={handleChange} rows={5}
                                          className='rounded-lg p-1 border border-[#6A6A6A] mt-[12px]' type='text'
                                          required/>
                            </div>
                            <button
                                className='text-[20px] font-semibold leading-[28px] bg-[#B38B00] py-[17px] mt-[28px] text-white w-full rounded-[17px] shadow-md'>Sent
                                Message
                            </button>
                        </form>
                    </div>
                    <div className="col-span-2 mt-5 md:mt-0 md:col-span-1 flex justify-center">
                        <img src='/assets/contact-us-image.png'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
