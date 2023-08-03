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
        <div className='bg-white py-20'>
            <div className='px-5 md:px-0 container mx-auto'>
                <div className="grid grid-cols-2 md:space-x-5">
                    <div className="col-span-2 md:col-span-1">
                        <h1 className='font-extrabold text-[40px] leading-[80px] text-[#1D2130]'>Contact Us</h1>
                        <p className='text-[18px] leading-[32.4px] text-[#1D2130]'>Our Friendly team would have to hear
                            from you</p>


                        <div className="contact-info">
                            <div className="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* <path
                                     d="M12 14C14.206 14 16 12.206 16 10C16 7.794 14.206 6 12 6C9.794 6 8 7.794 8 10C8 12.206 9.794 14 12 14ZM12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 11.103 10 10C10 8.897 10.897 8 12 8Z"
                                     fill="black"
                                     /> */}
                                    {/* <path
                                     d="M11.4201 21.814C11.5893 21.9349 11.7921 21.9998 12.0001 21.9998C12.2081 21.9998 12.4108 21.9349 12.5801 21.814C12.8841 21.599 20.0291 16.44 20.0001 10C20.0001 5.589 16.4111 2 12.0001 2C7.58909 2 4.00009 5.589 4.00009 9.995C3.97109 16.44 11.1161 21.599 11.4201 21.814ZM12.0001 4C15.3091 4 18.0001 6.691 18.0001 10.005C18.0211 14.443 13.6121 18.428 12.0001 19.735C10.3891 18.427 5.97909 14.441 6.00009 10C6.00009 6.691 8.69109 4 12.0001 4Z"
                                     fill="black"
                                     /> */}
                                </svg>
                            </div>
                            {/* <div className="content">
                             18 Wilie-Omiyi Street, Surulere Lagos
                             </div> */}
                        </div>
                        <div className="contact-info">
                            <div className="icon">
                                <svg
                                    width="23"
                                    height="23"
                                    viewBox="0 0 23 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.6875 20.8438H18.5653C4.44187 20.0316 2.43656 8.11469 2.15624 4.47781C2.13366 4.19504 2.16709 3.91059 2.25462 3.64076C2.34216 3.37094 2.48207 3.12103 2.66635 2.90537C2.85064 2.68971 3.07566 2.51253 3.32853 2.38398C3.58141 2.25543 3.85716 2.17804 4.13999 2.15625H8.10031C8.38821 2.15597 8.66956 2.24215 8.90792 2.40362C9.14628 2.56509 9.33066 2.79441 9.43718 3.06188L10.5297 5.75C10.6349 6.0113 10.661 6.29774 10.6048 6.57375C10.5485 6.84976 10.4125 7.10317 10.2134 7.3025L8.6825 8.84781C8.92164 10.2068 9.57244 11.4595 10.5469 12.4365C11.5213 13.4135 12.7723 14.0676 14.1306 14.3103L15.6903 12.765C15.8926 12.5682 16.1484 12.4353 16.4258 12.3829C16.7032 12.3305 16.9898 12.3609 17.25 12.4703L19.9597 13.5556C20.2231 13.6655 20.4479 13.8513 20.6053 14.0894C20.7628 14.3275 20.8458 14.6071 20.8437 14.8925V18.6875C20.8437 19.2594 20.6166 19.8078 20.2122 20.2122C19.8078 20.6166 19.2594 20.8438 18.6875 20.8438ZM4.31249 3.59375C4.12187 3.59375 3.93905 3.66948 3.80426 3.80427C3.66947 3.93906 3.59374 4.12188 3.59374 4.3125V4.37C3.92437 8.625 6.04468 18.6875 18.6444 19.4062C18.7388 19.4121 18.8334 19.3992 18.9229 19.3684C19.0123 19.3376 19.0948 19.2894 19.1656 19.2266C19.2364 19.1639 19.2941 19.0877 19.3354 19.0026C19.3767 18.9175 19.4007 18.8251 19.4062 18.7306V14.8925L16.6966 13.8072L14.6337 15.8556L14.2887 15.8125C8.03562 15.0291 7.18749 8.77594 7.18749 8.71125L7.14437 8.36625L9.18562 6.30344L8.10749 3.59375H4.31249Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                            <div className="content">
                                <div>+234 (0) 807 787 4589</div>
                            </div>
                        </div>
                        <div className="contact-info">
                            <div className="icon">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19.25 4.125H2.75C2.38533 4.125 2.03559 4.26987 1.77773 4.52773C1.51987 4.78559 1.375 5.13533 1.375 5.5V16.5C1.375 16.8647 1.51987 17.2144 1.77773 17.4723C2.03559 17.7301 2.38533 17.875 2.75 17.875H19.25C19.6147 17.875 19.9644 17.7301 20.2223 17.4723C20.4801 17.2144 20.625 16.8647 20.625 16.5V5.5C20.625 5.13533 20.4801 4.78559 20.2223 4.52773C19.9644 4.26987 19.6147 4.125 19.25 4.125ZM17.7375 5.5L11 10.1612L4.2625 5.5H17.7375ZM2.75 16.5V6.12562L10.6081 11.5637C10.7232 11.6436 10.8599 11.6864 11 11.6864C11.1401 11.6864 11.2768 11.6436 11.3919 11.5637L19.25 6.12562V16.5H2.75Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                            {/* <div className="content">info@techlinegroup.com</div> */}
                        </div>
                        <div id="map">
                            {/* <iframe
                             title="map"
                             src="https://maps.google.com/maps?q=18%20Willie%20Omiyi%20St,%20Animashaun,%20Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
                             width="100%"
                             height="200px"
                             frameBorder="0"
                             allowFullScreen
                             ></iframe> */}
                        </div>

                        {/* Form */}
                        <form className='mt-[65px] md:mr-20' onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 space-x-5">
                                <div className="col-span-1 flex flex-col justify-start">
                                    <label htmlFor='firstName' className='text-[18px] leading-[32.4px] text-[#1D2130]'>First
                                        Name</label>
                                    <input name="firstName" onChange={handleChange}
                                           className='rounded-lg p-1 border border-[#6A6A6A] mt-[15px]' type='text'
                                           required/>
                                </div>
                                <div className="col-span-1 flex flex-col justify-start">
                                    <label htmlFor='lastName' className='text-[18px] leading-[32.4px] text-[#1D2130]'>Last
                                        Name</label>
                                    <input name="lastName" onChange={handleChange}
                                           className='rounded-lg p-1 border border-[#6A6A6A] mt-[15px]' type='text'
                                           required/>
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start mt-[30px]">
                                <label htmlFor='email'
                                       className='text-[18px] leading-[32.4px] text-[#1D2130]'>Email</label>
                                <input name='email' onChange={handleChange}
                                       className='rounded-lg p-1 border border-[#6A6A6A] mt-[15px]' type='email'
                                       required/>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start mt-[30px]">
                                <label htmlFor='entered_phone' className='text-[18px] leading-[32.4px] text-[#1D2130]'>Phone
                                    Number</label>
                                <input name='entered_phone' onChange={handleChange}
                                       className='rounded-lg p-1 border border-[#6A6A6A] mt-[15px]' type='text'
                                       required/>
                            </div>
                            <div className="col-span-1 flex flex-col justify-start mt-[30px]">
                                <label htmlFor='entered_message'
                                       className='text-[18px] leading-[32.4px] text-[#1D2130]'>Message</label>
                                <textarea name='entered_message' onChange={handleChange} rows={5}
                                          className='rounded-lg p-1 border border-[#6A6A6A] mt-[15px]' type='text'
                                          required/>
                            </div>
                            <button
                                className='text-[18px] font-semibold leading-[30px] bg-[#625038] py-[17px] mt-[30px] text-white w-full rounded-xl'>Sent
                                Message
                            </button>
                        </form>
                    </div>
                    <div className="col-span-2 mt-5 md:mt-0 md:col-span-1 flex justify-end">
                        <img src='/img/contact_us_map.png'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
