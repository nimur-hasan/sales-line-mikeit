import Cookies from "js-cookie";

export const headerOptions = {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    user_token = Cookies.get("user_token"),
    baseUrl = "http://localhost:5000/user";

export const CONTACT_API_URL = 'https://01hrl8d13h.execute-api.us-east-1.amazonaws.com/v2/contact'
export const GET_ALL_ARTICLES_URL = baseUrl + "/news/"

export const toCommaAmount = (origNum) => {
    let newNum = origNum
    if (origNum !== null) {
        if (typeof origNum == 'string') {
            newNum = Number(origNum);
        }
        const options = {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currencySign: 'accounting'
        }

        const intNum = new Intl.NumberFormat('en-NG', options).format(newNum);
        const formatted = intNum.replace(/(?<=\d)NGN/g, '\u20A6');
        return formatted.toString()
    }
}

export const formatDate = input => {
    if (input)
    {
        const date = new Date(input);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    }
};


export const formatDateTime = input => {
    if (input)
    {
        const date = new Date(input);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    }
};
