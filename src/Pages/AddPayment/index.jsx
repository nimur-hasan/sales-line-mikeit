import React, {useContext, useEffect, useState} from "react";
import {Post} from "../../Adapters/xhr";
import {toast} from "react-toastify";
import SubmitButton from "../../components/Buttons/SubmitButton";
import CustomTextField from "../../components/InputFields/CustomTextField";
import {UserContext} from "../../App";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function AddPayment() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [formValues, setFormValues] = useState({});

    const [allCustomers, setAllCustomers] = useState([]);
    const [allProductOrServices, setAllProductOrServices] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState("");
    const [selectedProduct, setSelectedProduct] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [description, setDescription] = React.useState("");

    const getAllCustomers = async () => {
        try {
            const response = await Post("customer", {token: loggedInUser.token});
            if (!response.data === false) {
                setAllCustomers(response.data);
                console.log("log:", response);
            }
        } catch (error) {
            toast.warn("Try Again");
        }
    };

    const getAllProductOrServices = async () => {
        try {
            const response = await Post("productOrService", {
                token: loggedInUser.token,
            });
            console.log("log:", response);
            if (!response.data === false) {
                setAllProductOrServices(response.data);
            }
        } catch (error) {
            toast.warn("Try Again");
        }
    };

    useEffect(() => {
        getAllCustomers();
        getAllProductOrServices();
    }, []);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        const newFormValues = formValues;
        newFormValues[e.target.name] = e.target.value;
        setFormValues(newFormValues);

    };
    const handleDescChange = (e)=> {
            setDescription(e.target.value);
            const newFormValues = formValues;
            newFormValues[e.target.name] = e.target.value;
            setFormValues(newFormValues);
        };

    function getDisabledAfter() {
        setDisabled(false);
        clearAllFields();
    }

    function clearAllFields() {
        setFormValues({})
        setDescription("")
        setAmount("")
        setSelectedProduct("")
        setSelectedCustomer("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        // if (selectedProduct === "") {
        //   Swal.warn("Please Select a Product or Service");
        // } else {
        try {
            const response = await Post("payment/addPayment", {
                ...formValues,
                organisation: loggedInUser.user.organisation,
                customer: selectedCustomer,
                product: selectedProduct,
                token: loggedInUser.user_token,
            });
            // console.log("<< response")
            // console.log(response)
            // console.log("response >>")
            toast.success("Payment added successfully.");
            setTimeout(getDisabledAfter, 1000)
        } catch (error) {
            toast.warn("Try Again!");
            setDisabled(false);
        }
        console.log("<<< formValues")

        console.log({formValues});
        console.log("formValues >>>")  //}
    };


    const selectHandleChangeCustomer = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const selectHandleChangeProduct = (event) => {
        setSelectedProduct(event.target.value);
    };

    return (
        <div className="w-[50%] mx-auto">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <h1 className="text-center text-2xl ">Daily Sales</h1>
                <FormControl variant="standard" sx={{marginTop: "25px"}}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Select A Product or Service
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedProduct}
                        onChange={selectHandleChangeProduct}
                        label="Product/Service"
                        required={true}
                    >
                        <MenuItem value="">
                            <em>--NONE--</em>
                        </MenuItem>
                        {allProductOrServices.map((product, index) => {
                            return <MenuItem value={product._id}>{product.name}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                <CustomTextField
                    name="description"
                    value={description}
                    onChange={handleDescChange}
                    label="Description"
                    required={false}
                />
                <CustomTextField
                    name="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    label="Amount"
                    required={true}
                    type="number"
                />

                <FormControl variant="standard" sx={{marginTop: "25px"}}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Select Customer
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedCustomer}
                        onChange={selectHandleChangeCustomer}
                        label="Customer"
                        required={false}
                    >
                        <MenuItem value="">
                            <em>--NONE--</em>
                        </MenuItem>
                        {allCustomers.map((customer, index) => {
                            return (
                                <MenuItem value={customer._id}>
                                    {customer.customer_name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <SubmitButton
                    type="submit"
                    disabled={disabled}
                />
            </form>
        </div>
    );
}
