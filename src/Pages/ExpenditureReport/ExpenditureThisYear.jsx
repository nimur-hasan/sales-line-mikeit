import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {Delete, Post} from "../../Adapters/xhr";
import {UserContext} from "../../App";
import MUIDialog from "../../components/Dailog/MUIDialog";
import DataTable from "../../components/DataTable/MUITable";
import UpdatePayment from "../AddPayment/UpdatePayment";
import {toCommaAmount} from "../../Constants/constants";
import {Chart} from "../../components/index";
import UpdateSpentMoney from "../SpentMoney/UpdateSpentMoney";

export default function ExpenditureThisYear() {
    const [filteredIncome, setFilteredIncome] = useState(null);
    const [allPayment, setallPayment] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");
    const [open2, setOpen2] = useState(false);
    const [rowData, setRowData] = useState(null)

    let theFilteredIncome;

    const filterAllIncome = (thisYearsData) => {
        try {
            // console.log("inside filterAllIncome");
            // console.log(thisYearsData)
            let incomeMonth = 0;
            const chartDataPoints = [
                {label: 'Jan', value: 0},
                {label: 'Feb', value: 0},
                {label: 'Mar', value: 0},
                {label: 'Apr', value: 0},
                {label: 'May', value: 0},
                {label: 'Jun', value: 0},
                {label: 'Jul', value: 0},
                {label: 'Aug', value: 0},
                {label: 'Sep', value: 0},
                {label: 'Oct', value: 0},
                {label: 'Nov', value: 0},
                {label: 'Dec', value: 0}
            ]

            thisYearsData.forEach((ExpenditureObject, index) => {
                // console.log("inside for loop")
                // console.log( ExpenditureObject);
                // console.log("after for ExpenditureObject")
                // console.log("income amount is " + ExpenditureObject.amount)
                // console.log("income created_date is " + ExpenditureObject.created_date)
                incomeMonth = new Date(ExpenditureObject.created_date).getMonth();//starting at 0
                // console.log("incomeMonth is " + incomeMonth)
                chartDataPoints[incomeMonth].value += +ExpenditureObject.cost_price
            });

            // console.log("chartDataPoints START >> ");
            // console.log(chartDataPoints);
            // console.log("chartDataPoints ENDS >> ");
            return <Chart dataPoints={chartDataPoints}/>

        } catch (error) {
            console.error("This error >> " + error)
        }
    };


    const getAllspents = async () => {
        try {
            const response = await Post("spent", {
                token: loggedInUser.user_token,
            });
            // console.log("log:", response);

            if (!response.data === false) {
                const thisYearsData = [];

                response.data.map((data) => {
                    const date = data.created_date;
                    const createdDate = new Date(date).getFullYear();
                    const today = new Date();
                    const thisYear = today.getFullYear();

                    // console.log("created: ", createdDate, "today: ", today);
                    if (createdDate === thisYear) {
                        console.log("push: ", {
                            ...data,
                            item_name: data?.item?.item_name || data?.item_name,
                        });
                        thisYearsData.push({
                            ...data,
                            item_name: data?.item?.item_name || data?.item_name,
                        });

                        theFilteredIncome = filterAllIncome(thisYearsData)
                        setFilteredIncome(theFilteredIncome)

                        // function to loop through array of objects and add values of a field
                        let computedTotalAmount = thisYearsData.reduce(function (prev, cur) {
                            return prev + +cur.cost_price;
                        }, 0);
                        // console.log('Total Amount:', computedTotalAmount);
                        computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                        setTotalAmount(computedTotalAmount);
                    }
                });
                setallPayment(thisYearsData);
            }
            setLoading(false);
        } catch (error) {
            toast.warn("Try Again");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllspents();
    }, [open]);

    const columns = [
        {field: "description", title: "Description", width: 70},
        {field: "cost_price", title: "cost_price", width: 70},
        {field: "unit", title: "Units", width: 70},
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
                        setallPayment(result.data);
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
                    tableTitle="This Year's Income"
                    columns={columns}
                    rows={allPayment}
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
                content={<UpdateSpentMoney updateData={updateData} setOpen={setOpen}/>}
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
