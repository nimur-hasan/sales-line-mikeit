import React from "react";

import {Chart} from  '../../../components/index';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../App";
import {Post} from "../../../Adapters/xhr";
import {toCommaAmount} from "../../../Constants/constants";
import {toast} from "react-toastify";

const DailyIncomeChart = () => {
    const [allpayment, setallpayment] = useState([]);
    const [filteredIncome, setFilteredIncome] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [updateData, setUpdateData] = useState(null);
    const [totalAmount, setTotalAmount] = useState("0");

    let theFilteredIncome;


    const filterAllIncome = (thisYearsData) => {
        try {
            console.log("inside WEEKLY -----filterAllIncome");
            console.log(thisYearsData)
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
                chartDataPoints[incomeMonth].value += +incomeObject.amount
            });

            return <Chart dataPoints={chartDataPoints}/>

        } catch (error) {
            console.error("This error >> " + error)
            return <p>Nothing to show</p>
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
    // console.log("thisWeekStarting ", thisWeekStarting)

    const getAllPayments = async () => {
        try {
            const response = await Post("payment", {
                token: loggedInUser.user_token,
            });
            // console.log("WEEK -- getAllPayments log:", response);

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
                                customer: data?.customer?.customer_name,
                                product_name: data?.product?.name,
                            });
                            thisWeeksData.push({
                                ...data,
                                customer: data?.customer?.customer_name,
                                product_name: data?.product?.name,
                                customer_info: data?.customer
                            });
                            console.log(thisWeeksData)

                            theFilteredIncome = filterAllIncome(thisWeeksData)
                            setFilteredIncome(theFilteredIncome)

                            // function to loop through array of objects and add values of a field
                            let computedTotalAmount = thisWeeksData.reduce(function (prev, cur) {
                                return prev + +cur.amount;
                            }, 0);
                            console.log('Total Amount:', computedTotalAmount);
                            computedTotalAmount = toCommaAmount(computedTotalAmount + "");
                            setTotalAmount(computedTotalAmount);
                        }
                    }
                });
                setallpayment(thisWeeksData);
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

export {DailyIncomeChart};


