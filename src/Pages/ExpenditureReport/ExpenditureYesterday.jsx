import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {Delete, Post, Update} from "../../Adapters/xhr";
import {UserContext} from "../../App";
import MUIDialog from "../../components/Dailog/MUIDialog";
import DataTable from "../../components/DataTable/MUITable";
import UpdateSpentMoney from "../SpentMoney/UpdateSpentMoney";
import {toCommaAmount} from "../../Constants/constants";

export default function ExpenditureYesterday() {
    const [allspents, setAllspents] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");

    const getAllExpenseItems = async () => {
        try {
            const response = await Post("spent", {token: loggedInUser.user_token});
            console.log("log:", response);

            if (!response.data === false) {
                const todaysData = [];

                response.data.map((data) => {
                    const date = data.created_date;
                    const createdDate = new Date(date).getDate();
                    const today = new Date();
                    const yesterday = today.setDate(today.getDate() - 1);

                    console.log(
                        "created: ",
                        createdDate,
                        "yesterday: ",
                        new Date(yesterday).getDate()
                    );
                    if (createdDate === new Date(yesterday).getDate()) {
                        todaysData.push({
                            ...data,
                            item_name: data?.item?.item_name || data?.item_name,
                        });
                        // function to loop through array of objects and add values of a field
                        let computedTotalAmount = todaysData.reduce(function (prev, cur) {
                            return prev + +cur.cost_price;
                        }, 0);
                        // console.log('Total Amount:', computedTotalAmount);
                        computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                        setTotalAmount(computedTotalAmount);
                    }
                });
                setAllspents(todaysData);
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
                tableTitle="Yesterday Expenditure"
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
        </div>
    );
}
