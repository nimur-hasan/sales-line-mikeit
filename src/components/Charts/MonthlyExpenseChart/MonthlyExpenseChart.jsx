import React from "react";

import {Chart} from  '../../../components/index';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../App";
import {Post} from "../../../Adapters/xhr";
import {toCommaAmount} from "../../../Constants/constants";
import {toast} from "react-toastify";

const MonthlyExpenseChart = () => {
    const [allpayment, setallpayment] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");


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

            thisYearsData.forEach((incomeObject, index) => {
                // console.log("inside for loop")
                // console.log( incomeObject);
                // console.log("after for incomeObject")
                // console.log("income cost_price is " + incomeObject.cost_price)
                // console.log("income created_date is " + incomeObject.created_date)
                incomeMonth = new Date(incomeObject.created_date).getMonth();//starting at 0
                // console.log("incomeMonth is " + incomeMonth)
                chartDataPoints[incomeMonth].value += +incomeObject.cost_price
            });

            // console.log("chartDataPoints START >> ");
            // console.log( chartDataPoints);
            // console.log("chartDataPoints ENDS >> " );
            return <Chart dataPoints={chartDataPoints}/>

        } catch (error) {
            console.error("This error >> " + error)
        }
    };

    const getAllPayments = async () => {
        try {
            const response = await Post("spent", {
                token: loggedInUser.user_token,
            });
            console.log("log:", response);

            if (!response.data === false) {
                const thisYearsData = [];

                response.data.map((data) => {
                    const date = data.created_date;
                    const createdDate = new Date(date).getFullYear();
                    const today = new Date();
                    const thisYear = today.getFullYear();

                    console.log("created: ", createdDate, "today: ", today);
                    if (createdDate === thisYear) {
                        console.log("push: ", {
                            ...data,
                            item_name: data?.item?.item_name || data?.item_name,
                        });
                        thisYearsData.push({
                            ...data,
                            item_name: data?.item?.item_name || data?.item_name,
                        });
                        // console.log(thisYearsData);
                        const theFilteredIncome = filterAllIncome(thisYearsData)

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
                setallpayment(thisYearsData);
            }
            setLoading(false);
        } catch (error) {
            toast.warn("Try Again");
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPayments();
    }, []);
    return (
        <div>{filteredIncome}</div>
    )
};

export {MonthlyExpenseChart};


