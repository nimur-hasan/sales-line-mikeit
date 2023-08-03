import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';

export default function SingleIncomePrint({rowData = []}) {
    console.log("rowData", rowData)
    const {product, customer_info} = rowData;
    const componentRef = useRef();
    console.log("<<< before product >>>>>>")
    console.log(product)
    console.log("<<< after product >>>>>>")
    return (
        <div className='p-20'>
            <div id="printInvoice">
                <div className='mx-5'>
                    <div className='flex justify-center p-hide'>
                        <div>
                            <ReactToPrint
                                trigger={() => <button
                                    className='text-white px-5 py-3 rounded-md bg-[#F6C88D]'>Download</button>}
                                content={() => document.getElementById('printInvoice')}
                            />

                        </div>
                    </div>
                    <div className='border-b '>
                        <img height='220px' width="220px" src="/img/salsline-big-logo.png"/>
                    </div>
                    <h1 className='text-5xl font-semibold p-4'>Invoice</h1>
                    {/* summary */}
                    <div>
                        <div className="grid grid-cols-2 p-4">
                            <div className="col-span-1">
                                <ul>
                                    <li>{customer_info?.customer_name}</li>
                                    <li>{customer_info?.phone}</li>
                                    <li>{customer_info?.email}</li>
                                    <li>{customer_info?.address}</li>
                                </ul>
                            </div>
                            <div className="col-span-1 flex justify-end">
                                {/*<div className="grid grid-cols-5 w-full">*/}
                                {/*  <div className="col-span-2"></div>*/}
                                {/*  <div className="col-span-2">*/}
                                {/*    <ul>*/}
                                {/*      <li>Subtotal Amount:</li>*/}
                                {/*      <li>Vat Amount:</li>*/}
                                {/*      <li>Total Amount:</li>*/}
                                {/*    </ul>*/}
                                {/*  </div>*/}
                                {/*  <div className="col-span-1 font-semibold flex justify-end">                  */}
                                {/*    <ul>*/}
                                {/*      <li>N 10</li>*/}
                                {/*      <li>0</li>*/}
                                {/*      <li>N 10</li>*/}
                                {/*    </ul>*/}
                                {/*  </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className='mt-20'>
                        <table className='w-[780px]'>
                            <tr className='bg-[#F6C88D] py-2 border border-[#F6C88D]'>
                                <th className=''>Date</th>
                                <th className=''>Invoice</th>
                                <th className=''>Description</th>
                                <th className=''>Amount</th>
                            </tr>

                            <tr className='mt-5 border'>
                                <td className='text-center border-r mt-5'>{new Date(product.date_time).toDateString()}</td>
                                <td className='text-center border-r mt-5'>{product?.invoice_no}</td>
                                <td className='text-center border-r mt-5'>{product?.description}</td>
                                <td className='text-center'>N {product?.price}</td>
                            </tr>

                        </table>
                    </div>
                    <div className='mt-20 border-t pt-5'>
                        <p>Email: info@salesline.click • Website: https://www.salesline.click</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
