import React from "react";

import {Chart} from '../../index';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../App";
import {Post} from "../../../Adapters/xhr";
import {toCommaAmount} from "../../../Constants/constants";
import {toast} from "react-toastify";

const DailyExpenseChartLastW = () => {
    const [allpayment, setallpayment] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");

    let theFilteredIncome;


    const filterAllIncome = (thisYearsData) => {
        try {
            // console.log("inside filterAllIncome");
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
                chartDataPoints[incomeMonth].value += +incomeObject.cost_price
            });

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
    // const lastWeekStarting = today.setDate(today.getDate() - 6);
    const lastWeekStarting = today.getDate() - WEEK_DAY_NUMBER - 7
    const thisWeekStarting = today.getDate() - WEEK_DAY_NUMBER

    // const thisWeekStarting = today.setDate(today.getDate() - WEEK_DAY_NUMBER);


    const getAllPayments = async () => {
        try {
            const response = await Post("spent", {
                token: loggedInUser.user_token,
            });
            console.log("log:", response);

            if (!response.data === false) {
                const lastWeekssData = [];

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
                                item_name: data?.item?.item_name || data?.item_name,
                            });
                            lastWeekssData.push({
                                ...data,
                                item_name: data?.item?.item_name || data?.item_name,
                            });
                            // console.log(lastWeekssData);
                            theFilteredIncome = filterAllIncome(lastWeekssData)
                            setFilteredIncome(theFilteredIncome)
                            // function to loop through array of objects and add values of a field
                            let computedTotalAmount = lastWeekssData.reduce(function (prev, cur) {
                                return prev + +cur.cost_price;
                            }, 0);
                            // console.log('Total Amount:', computedTotalAmount);
                            computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                            setTotalAmount(computedTotalAmount);
                        }
                    }
                });
                setallpayment(lastWeekssData);
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

export {DailyExpenseChartLastW};


