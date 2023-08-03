import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import Swal from 'sweetalert2';
import {Delete, Post} from '../../Adapters/xhr';
import {UserContext} from '../../App';
import MUIDialog from '../../components/Dailog/MUIDialog';
import DataTable from '../../components/DataTable/MUITableH';
// import DataTable from '../../components/DataTable/MUITableP';
import UpdateProductOrService from '../RegisterProductOrService/UpdateProductOrService';
import ProductReport from './ProductReport';

export default function AllProductOrService() {

    const [allProductOrServices, setAllProductOrServices] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [selectedRowData, setRowData] = useState(false)
    const [selectedProductName, setSelectedProductName] = useState("")
    const [updateData, setUpdateData] = useState(null)
    const [itemCount, setItemCount] = useState("0")

    const history = useHistory()
    useEffect(() => {
        if (!loggedInUser.user.isAdmin) {
            history.push('/login')
        }
    }, [])

    const getAllProductOrServices = async () => {
        try {
            const response = await Post("productOrService", {token: loggedInUser.token})
            console.log("log:", response)
            if (!response.data == false) {
                console.log("response data", response.data)
                setAllProductOrServices(response.data)
                setItemCount(response.data.length)
            }
            setLoading(false)
        } catch (error) {
            toast.warn("Try Again")
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllProductOrServices()
    }, [open])

    const columns = [
        {field: 'name', title: 'Item Name', width: 70},
        {field: 'expire', title: 'Expiry Date', width: 70},
        {field: 'unit', title: 'Units', width: 70},
        {field: 'description', title: 'Description', width: 70},
        {field: 'price', title: 'Price', width: 70},
        {field: 'quantity', title: 'Quantity', width: 70}
    ]


    const handleDelete = async (rowData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Delete(`productOrService/deleteProductOrService/${rowData._id}`).then(result => {
                    setAllProductOrServices(result.data)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }).catch(err => {
                    toast.warn("Try Again!")
                })

            }
        })
    }

    const handlePrint = async (rowData) => {
        try {
            const response = await Post(`payment/${rowData._id}`, {token: loggedInUser.token})
            console.log("respone: ", response)
            if (!response === false) {
                const modifiedData = [];
                response.data.map((data, index) => {
                    console.log("index", index)
                    modifiedData.push({
                        customer: data.customer?.customer_name,
                        description: data.description,
                        amount: data.amount,
                        created_date: new Date(data.created_date).toDateString()
                    })
                })
                setSelectedProductName(rowData.name)
                setRowData(modifiedData)
                setOpen2(true)
            } else {
                toast.warn("Data Fetching Failed")
            }
        } catch (error) {

        }
    }

    return (
        <div>
            <DataTable loading={loading} tableTitle="All ProductOrServices" columns={columns}
                       rows={allProductOrServices} handleEdit={(rowData) => {
                setUpdateData(rowData);
                setOpen(true);
            }} handleDelete={handleDelete} handlePrint={handlePrint}/>
            <MUIDialog open={open} setOpen={setOpen}
                       content={<UpdateProductOrService updateData={updateData} setOpen={setOpen}/>}/>
            <MUIDialog open={open2} setOpen={setOpen2} content={<ProductReport rowData={selectedRowData}
                                                                               tableTitle={`${selectedProductName} sales report`}/>}/>
            <p>
                <b>No. of Items: {itemCount}</b>
            </p>
        </div>
    )
}
