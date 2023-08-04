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
        <div className='w-full h-full'>            
            <div >
                <h1 className='text-[32px] font-semibold text-[#003358]'>Welcome to <span>SalesLine</span></h1>
                <p className='text-[20px] my-[22px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h3 className='text-[32px] font-semibold text-[#003358]'>Income for 2023</h3>

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
                <h3 className='text-[32px] font-semibold text-[#003358]'>Income for This Week</h3>

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
                <h3 className='text-[32px] font-semibold text-[#003358]'>Income for Last Week</h3>

                <p> {!loading &&
                    <DailyIncomeChartLastW/>}
                    {loading
                        &&
                        <p> Loading..<br/>
                        </p>
                    }
                </p>
                <hr/>
                <h3 className='text-[32px] font-semibold text-[#003358]'>Expenses for 202
                3</h3>

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
                <h3 className='text-[32px] font-semibold text-[#003358]'>Expenses for This Week</h3>

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
                <h3 className='text-[32px] font-semibold text-[#003358]'>Expenses for Last Week</h3>

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
