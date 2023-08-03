import React from 'react';
import {toCommaAmount} from "../../../Constants/constants";

const ChartItemList = (props) => {

    return <div >
        <span >{props.label} &nbsp; : &nbsp;</span>
        <span >
            &nbsp; {toCommaAmount(props.value)}
        </span>

    </div>
};

export {ChartItemList};
