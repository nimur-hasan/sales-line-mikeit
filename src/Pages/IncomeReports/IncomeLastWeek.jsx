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
import {Chart} from "../../components";

export default function IncomeLastWeek() {
    const [allpayment, setallpayment] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");
    const [open2, setOpen2] = useState(false);
    const [rowData, setRowData] = useState(null)

    const getWeekDayNumber = () => {
        const d = new Date();
        return d.getDay();
    };

    let WEEK_DAY_NUMBER = getWeekDayNumber();
    const today = new Date();
    // const lastWeekStarting = today.setDate(today.getDate() - 6);
    const lastWeekStarting = today.getDate() - WEEK_DAY_NUMBER - 7
    const thisWeekStarting = today.getDate() - WEEK_DAY_NUMBER

    // const thisWeekStarting = today.setDate(today.getDate() - WEEK_DAY_NUMBER);

    let theFilteredIncome;

    const filterAllIncome = (thisYearsData) => {
        try {
            console.log("inside filterAllIncome");
            // console.log(thisYearsData)
            let incomeMonth = 0;
            const chartDataPoints = [
                {label: 'Sun', value: 0},
                {label: 'Mon', value: 0},
                {label: 'Tue', value: 0},
                {label: 'Wed', value: 0},
                {label: 'Thur', value: 0},
                {label: 'Fri', value: 0},
                {label: 'Sat', value: 0},
            ]

            thisYearsData.forEach((incomeObject, index) => {

                incomeMonth = new Date(incomeObject.created_date).getDay();//starting at 0
                // console.log("incomeMonth is " + incomeMonth)
                chartDataPoints[incomeMonth].value += +incomeObject.amount
            });

            return <Chart dataPoints={chartDataPoints}/>

        } catch (error) {
            console.error("This error >> " + error)
        }
    };

    const getallpayment = async () => {
        try {
            const response = await Post("payment", {
                token: loggedInUser.user_token,
            });
            console.log("log:", response);

            if (!response.data === false) {
                const lastWeeksData = [];

                response.data.map((data) => {
                    const date = data.created_date;
                    const createdDate = new Date(date).getDate();
                    const day = new Date();
                    const thisMonth = day.getMonth();
                    const createdMonth = new Date(date).getMonth();

                    if (thisMonth === createdMonth) {

                        if ((lastWeekStarting <= createdDate) && (createdDate <= thisWeekStarting)) {
                            console.log("push: ", {
                                ...data,
                                customer: data?.customer?.customer_name,
                                product_name: data?.product?.name,
                            });
                            lastWeeksData.push({
                                ...data,
                                customer: data?.customer?.customer_name,
                                product_name: data?.product?.name,
                                customer_info: data?.customer
                            });
                            // console.log(lastWeeksData);
                            theFilteredIncome = filterAllIncome(lastWeeksData)
                            setFilteredIncome(theFilteredIncome)
                            // function to loop through array of objects and add values of a field
                            let computedTotalAmount = lastWeeksData.reduce(function (prev, cur) {
                                return prev + +cur.amount;
                            }, 0);
                            // console.log('Total Amount:', computedTotalAmount);
                            computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                            setTotalAmount(computedTotalAmount);
                        }
                    }
                });
                setallpayment(lastWeeksData);
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
                tableTitle="Last Week Income"
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
            <p>
                &nbsp;
                <div>{filteredIncome}</div>
            </p>
        </div>
    );
}
