import React, {useState} from 'react'
import {
    DailyIncomeChart,
    DailyIncomeChartLastW,
    MonthlyIncomeChart,
    DailyExpenseChart,
    DailyExpenseChartLastW,
    MonthlyExpenseChart
} from "../../components";
export default function Welcome() {
    const [loading, setLoading] = useState(true);

    function countDown() {
        setLoading(false);
    }

    setTimeout( countDown, 2000);

    return (
        <div className='w-full h-full flex  items-center'>
            <div >
                <h1 className='text-3xl'>Welcome to <span>SalesLine</span></h1>
                <h3 >Income for 2022</h3>

                <p> {!loading &&
                    <MonthlyIncomeChart/>}
                {loading
                    &&
                    <p> Loading..<br/>
                    </p>
                }
                </p>
                &nbsp;
                &nbsp;
                &nbsp;
                <h3 >Income for This Week</h3>

                <p> {!loading &&
                    <DailyIncomeChart/>}
                    {loading
                        &&
                        <p> Loading..<br/>
                        </p>
                    }
                </p>
                &nbsp;
                &nbsp;
                &nbsp;
                <h3 >Income for Last Week</h3>

                <p> {!loading &&
                    <DailyIncomeChartLastW/>}
                    {loading
                        &&
                        <p> Loading..<br/>
                        </p>
                    }
                </p>
                <hr/>
                <h3 >Expenses for 2022</h3>

                <p> {!loading &&
                    <MonthlyExpenseChart/>}
                    {loading
                        &&
                        <p> Loading..<br/>
                        </p>
                    }
                </p>
                &nbsp;
                &nbsp;
                &nbsp;
                <h3 >Expenses for This Week</h3>

                <p> {!loading &&
                    <DailyExpenseChart/>}
                    {loading
                        &&
                        <p> Loading..<br/>
                        </p>
                    }
                </p>
                &nbsp;
                &nbsp;
                &nbsp;
                <h3 >Expenses for Last Week</h3>

                <p> {!loading &&
                    <DailyExpenseChartLastW/>}
                    {loading
                        &&
                        <p> Loading..<br/>
                        </p>
                    }
                </p>
            </div>
        </div>

    )
}
