import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {Delete, Post} from "../../Adapters/xhr";
import {UserContext} from "../../App";
import MUIDialog from "../../components/Dailog/MUIDialog";
import DataTable from "../../components/DataTable/MUITable";
import UpdatePayment from "../AddPayment/UpdatePayment";
import {toCommaAmount} from "../../Constants/constants";
import SingleIncomePrint from "./SingleIncomePrint";

export default function IncomeThisMonth() {
    const [allpayment, setallpayment] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");
    const [open2, setOpen2] = useState(false);
    const [rowData, setRowData] = useState(null)

    const getallpayment = async () => {
        try {
            const response = await Post("payment", {
                token: loggedInUser.user_token,
            });
            console.log("log:", response);

            if (!response.data === false) {
                const todaysData = [];

                response.data.map((data) => {
                    const date = data.created_date;
                    const createdDate = new Date(date).getMonth();
                    const today = new Date();
                    const thisMonth = today.getMonth();

                    console.log("created: ", createdDate, "today: ", today);
                    if (createdDate === thisMonth) {
                        console.log("push: ", {
                            ...data,
                            customer: data?.customer?.customer_name,
                            product_name: data?.product?.name,
                        });
                        todaysData.push({
                            ...data,
                            customer: data?.customer?.customer_name,
                            product_name: data?.product?.name,
                            customer_info: data?.customer
                        });
                        // console.log(todaysData);
                        // function to loop through array of objects and add values of a field
                        let computedTotalAmount = todaysData.reduce(function (prev, cur) {
                            return prev + +cur.amount;
                        }, 0);
                        // console.log('Total Amount:', computedTotalAmount);
                        computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                        setTotalAmount(computedTotalAmount);
                    }
                });
                setallpayment(todaysData);
            }
            setLoading(false);
        } catch (error) {
            toast.warn("Try Again");
            setLoading(false);
        }
    };

    useEffect(() => {
        getallpayment();
    }, [open]);

    const columns = [
        {field: "product_name", title: "Name", width: 70},
        {field: "description", title: "Description", width: 70},
        {field: "amount", title: "Amount", width: 70},
        {field: "customer", title: "Customer", width: 70},
    ];


    const handleDelete = async (rowData) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Delete(`payment/deletepayment/${rowData._id}`)
                    .then((result) => {
                        setallpayment(result.data);
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    })
                    .catch((err) => {
                        toast.warn("Try Again!");
                    });
            }
        });
    };

    // For print
    const handlePrint = (rowData) => {
        setRowData(rowData)
        setOpen2(true)
        console.log("hit")
    }

    return (
        <div>
            {!loading &&
                <DataTable
                loading={loading}
                tableTitle="This Month Income"
                columns={columns}
                rows={allpayment}
                handleEdit={(rowData) => {
                    setUpdateData(rowData);
                    setOpen(true);
                }}
                handleDelete={handleDelete}
                handlePrint={(rowData) => handlePrint(rowData)}
            />}
            {loading
                &&
                <p> Loading..<br/> &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;
                    <br/> &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;<br/>  &nbsp;</p>
            }
            <MUIDialog
                open={open}
                setOpen={setOpen}
                content={<UpdatePayment updateData={updateData} setOpen={setOpen}/>}
            />
            <MUIDialog
                open={open2}
                setOpen={setOpen2}
                content={<SingleIncomePrint rowData={rowData}/>}
            />
            <p>
                <b>Total: {totalAmount}</b>
            </p>
        </div>
    );
}
