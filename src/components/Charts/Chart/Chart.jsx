import React from 'react';
import {ChartBar, ChartItemList} from '../../../components/index';
import './Chart.css';

const Chart = (props) => {
    // console.log("inside Charts")
    // console.log(props)
    // console.log("props end")
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value); //return array of values
    // console.log("dataPointValues >> " + dataPointValues)

    const totalMaximum = Math.max(...dataPointValues);
    // console.log("totalMaximum >> " + totalMaximum)

    return <div>

        <div className="chart">
            {props.dataPoints.map((dataPoint) => (
                <ChartBar
                    value={dataPoint.value}
                    maxValue={totalMaximum}
                    label={dataPoint.label}
                    key={dataPoint.label}
                />
            ))}
        </div>
        <div>
            {props.dataPoints.map((dataPoint) => (
                <ChartItemList
                    value={dataPoint.value}
                    label={dataPoint.label}
                    key={dataPoint.label}
                />
            ))}
        </div>
    </div>

};

export {Chart};
