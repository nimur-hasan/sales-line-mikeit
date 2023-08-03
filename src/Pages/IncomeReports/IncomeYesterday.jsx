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

export default function IncomeYesterday() {
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
                    const createdDate = new Date(date).getDate();
                    const today = new Date();
                    const yesterday = today.setDate(today.getDate() - 1);
                    const thisMonth = today.getMonth();
                    const createdMonth = new Date(date).getMonth();

                    if (thisMonth === createdMonth) {
                        if (createdDate === new Date(yesterday).getDate()) {
                            console.log("push: ", {
                                ...data,
                                customer: data?.customer?.customer_name,
                                product_name: data?.product?.name,
                                customer_info: data?.customer
                            });
                            todaysData.push({
                                ...data,
                                customer: data?.customer?.customer_name,
                                product_name: data?.product?.name,
                                customer_info: data?.customer
                            });

                            let computedTotalAmount = todaysData.reduce(function (prev, cur) {
                                return prev + +cur.amount;
                            }, 0);

                            computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                            setTotalAmount(computedTotalAmount);
                        }
                    }
                });
                // console.log("today ", todaysData)
                setallpayment(todaysData);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
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
                        console.log(err);
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
                tableTitle="Yesterday Income"
                columns={columns}
                rows={allpayment}
                handleEdit={(rowData) => {
                    setUpdateData(rowData);
                    setOpen(true);
                }}
                handlePrint={(rowData) => handlePrint(rowData)}
                handleDelete={handleDelete}
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
