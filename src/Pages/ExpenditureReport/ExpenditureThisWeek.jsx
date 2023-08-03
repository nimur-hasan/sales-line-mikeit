import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {Delete, Post, Update} from "../../Adapters/xhr";
import {UserContext} from "../../App";
import MUIDialog from "../../components/Dailog/MUIDialog";
import DataTable from "../../components/DataTable/MUITable";
import UpdateSpentMoney from "../SpentMoney/UpdateSpentMoney";
import {toCommaAmount} from "../../Constants/constants";
import {Chart} from "../../components";

export default function ExpenditureThisWeek() {
    const [filteredExpenditure, setFilteredExpenditure] = useState(null);
    const [allspents, setAllspents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");

    let theFilteredExpenditure;

    const filterAllExpenditure = (thisWeeksData) => {
        try {
            // console.log("inside filterAllExpenditure");
            // console.log(thisWeeksData)
            let incomeDay = 0;
            const chartDataPoints = [
                {label: 'Sun', value: 0},
                {label: 'Mon', value: 0},
                {label: 'Tue', value: 0},
                {label: 'Wed', value: 0},
                {label: 'Thur', value: 0},
                {label: 'Fri', value: 0},
                {label: 'Sat', value: 0},
            ]

            thisWeeksData.forEach((ExpenditureObject, index) => {
                // console.log("inside for loop")
                // console.log( ExpenditureObject);
                // console.log("after for ExpenditureObject")
                // console.log("income amount is " + ExpenditureObject.amount)
                // console.log("income created_date is " + ExpenditureObject.created_date)
                incomeDay = new Date(ExpenditureObject.created_date).getDay();//starting at 0
                // console.log("incomeDay is " + incomeDay)
                chartDataPoints[incomeDay].value += +ExpenditureObject.cost_price
            });

            // console.log("chartDataPoints START >> ");
            // console.log(chartDataPoints);
            // console.log("chartDataPoints ENDS >> ");
            return <Chart dataPoints={chartDataPoints}/>

        } catch (error) {
            console.error("This error >> " + error)
        }
    };

    const getWeekDayNumber = () => {
        const d = new Date();
        return d.getDay();
    };

    let WEEK_DAY_NUMBER = getWeekDayNumber();
    const today = new Date();
    const thisMonth = today.getMonth();

    const thisWeekStarting = today.getDate() - WEEK_DAY_NUMBER

    const getAllExpenseItems = async () => {
        try {
            const response = await Post("spent", {token: loggedInUser.user_token});
            console.log("log:", response);

            if (!response.data === false) {
                const thisWeeksData = [];

                response.data.map((data) => {

                    const date = data.created_date;
                    const createdMonth = new Date(date).getMonth();
                    const createdDate = new Date(date).getDate();


                    if (createdMonth === thisMonth) {

                        if ((today.getDate() >= createdDate) && (createdDate >= thisWeekStarting)) {
                            console.log("push: ", {
                                ...data,
                                item_name: data?.item?.item_name || data?.item_name,
                            });
                            thisWeeksData.push({
                                ...data,
                                item_name: data?.item?.item_name || data?.item_name,
                            });
                            // console.log(thisWeeksData)
                            theFilteredExpenditure = filterAllExpenditure(thisWeeksData)
                            setFilteredExpenditure(theFilteredExpenditure)

                            // function to loop through array of objects and add values of a field
                            let computedTotalAmount = thisWeeksData.reduce(function (prev, cur) {
                                return prev + +cur.cost_price;
                            }, 0);
                            // console.log('Total Amount:', computedTotalAmount);
                            computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                            setTotalAmount(computedTotalAmount);
                        }
                    }
                });
                setAllspents(thisWeeksData);
            }
            setLoading(false);
        } catch (error) {
            toast.warn("Try Again");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllExpenseItems();
    }, [open]);

    const columns = [
        {field: "description", title: "Description", width: 70},
        {field: "cost_price", title: "Amount", width: 70},
        {field: "unit", title: "Units", width: 70},
    ];

    const handleEdit = async (rowData) => {
        console.log("hit");
        await Swal.fire({
            title: `Edit spent`,
            html:
                `<input id="description" class="swal2-input" value="${rowData.description}">` +
                `<input id="unit" class="swal2-input" value="${rowData.unit}">` +
                `<input id="cost_price" class="swal2-input" value="${rowData.cost_price}">`,
            focusConfirm: false,
            preConfirm: async () => {
                const description = document.getElementById("description").value;
                const cost_price = document.getElementById("cost_price").value;
                const unit = document.getElementById("unit").value;

                try {
                    const updatedResult = await Update(
                        `spent/updatespent/${rowData._id}`,
                        {description, cost_price, unit}
                    );
                    console.log("updated result :", updatedResult);
                    setAllspents(updatedResult.data);
                } catch (error) {
                    toast.warn("Try Again!");
                }
            },
        });
    };

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
                Delete(`spent/deleteSpent/${rowData._id}`)
                    .then((result) => {
                        setAllspents(result.data);
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    })
                    .catch((err) => {
                        toast.warn("Try Again!");
                    });
            }
        });
    };

    return (
        <div>
            <DataTable
                loading={loading}
                tableTitle="This Week Expenditure"
                columns={columns}
                rows={allspents}
                handleEdit={(rowData) => {
                    setUpdateData(rowData);
                    setOpen(true);
                }}
                handleDelete={handleDelete}
            />
            <MUIDialog
                open={open}
                setOpen={setOpen}
                content={<UpdateSpentMoney updateData={updateData} setOpen={setOpen}/>}
            />
            <p>
                <b>Total: {totalAmount}</b>
            </p>
            <p>
                &nbsp;
                <div>{filteredExpenditure}</div>
            </p>
        </div>
    );
}
