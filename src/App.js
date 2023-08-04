import React, {createContext, useState} from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Layout from './Layout';
import AddExpense from './Pages/AddExpense';
import AddPayment from './Pages/AddPayment';
import AllUsers from './Pages/AllUsers';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RegisterProductOrService from './Pages/RegisterProductOrService';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Routes/PrivateRoute';
import AddCustomer from './Pages/AddCustomer/AddCustomer';
import NotFound from './Pages/NotFound/NotFound';
import AllCustomers from './Pages/AllCustomers/AllCustomers';
import Cookies from 'js-cookie';
import AllExpenseItems from './Pages/AllExpenseItems/AllExpenseItems';
import AllProductOrService from './Pages/AllProductOrService/AllProductOrService';
import SpentMoney from './Pages/SpentMoney/SpentMoney';
import ExpenditureToday from './Pages/ExpenditureReport/ExpenditureToday';
import ExpenditureLastMonth from './Pages/ExpenditureReport/ExpenditureLastMonth';
import ExpenditureThisMonth from './Pages/ExpenditureReport/ExpenditureThisMonth';
import ExpenditureYesterday from './Pages/ExpenditureReport/ExpenditureYesterday';
import axios from 'axios'
import ExpenditureThisWeek from './Pages/ExpenditureReport/ExpenditureThisWeek';
import ExpenditureLastWeek from './Pages/ExpenditureReport/ExpenditureLastWeek';
import ExpenditureThisYear from './Pages/ExpenditureReport/ExpenditureThisYear';
import IncomeToday from './Pages/IncomeReports/IncomeToday';
import Welcome from './Pages/Welcome/Welcome';
import IncomeYesterday from './Pages/IncomeReports/IncomeYesterday';
import IncomeThisWeek from './Pages/IncomeReports/IncomeThisWeek';
import IncomeLastWeek from './Pages/IncomeReports/IncomeLastWeek';
import IncomeThisMonth from './Pages/IncomeReports/IncomeThisMonth';
import IncomeLastMonth from './Pages/IncomeReports/IncomeLastMonth';
import IncomeThisYear from './Pages/IncomeReports/IncomeThisYear';
import Home from './Pages/Home/Home';
import PublicLayout from './Layout/PublicLayout';
import Pricing from './Pages/Pricing/Pricing';
import ContactUs from './Pages/ContactUs/ContactUs';
import  AllAuditTrails from "./Pages/AllAuditTrails"
import AboutUs from './Pages/AboutUs';

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({token: Cookies.get('user_token')});
    const [selectedService, setSelectedService] = useState({})
    axios.defaults.headers.common['Authorization'] = Cookies.get("user_token") || loggedInUser.user_token || "token pawa jay nai"
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser, selectedService, setSelectedService]}>
            <Router>


                <Switch>
                    <Route exact path="/">
                        {
                            loggedInUser.user_token ?
                                <Layout><Welcome/></Layout>
                                :
                                <Redirect to='/home'/>
                        }
                    </Route>
                    <Route exact path="/home">
                        <Home/>                        
                    </Route>

                    <Route exact path="/pricing">
                        <PublicLayout>
                            <Pricing/>
                        </PublicLayout>
                    </Route>
                    <Route exact path="/contact-us">
                        <PublicLayout>
                            <ContactUs/>
                        </PublicLayout>
                    </Route>
                    <Route exact path="/about-us">
                        <PublicLayout>
                            <AboutUs/>
                        </PublicLayout>
                    </Route>
                    <PrivateRoute exact path="/all-users">
                        <Layout><AllUsers/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/add-a-new-customer">
                        <Layout><AddCustomer/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/add-payment">
                        <Layout><AddPayment/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/add-expense-item">
                        <Layout><AddExpense/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/register-product-or-service">
                        <Layout><RegisterProductOrService/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/all-customers">
                        <Layout><AllCustomers/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/all-expense-items">
                        <Layout><AllExpenseItems/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/all-products-or-services">
                        <Layout><AllProductOrService/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/spent-money">
                        <Layout><SpentMoney/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/expenditure-today">
                        <Layout><ExpenditureToday/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/expenditure-yesterday">
                        <Layout><ExpenditureYesterday/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/expenditure-this-week">
                        <Layout><ExpenditureThisWeek/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/expenditure-last-week">
                        <Layout><ExpenditureLastWeek/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/expenditure-this-month">
                        <Layout><ExpenditureThisMonth/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/expenditure-last-month">
                        <Layout><ExpenditureLastMonth/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-today">
                        <Layout><IncomeToday/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-yesterday">
                        <Layout><IncomeYesterday/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-this-week">
                        <Layout><IncomeThisWeek/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-last-week">
                        <Layout><IncomeLastWeek/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-this-month">
                        <Layout><IncomeThisMonth/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-last-month">
                        <Layout><IncomeLastMonth/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/income-this-year">
                        <Layout><IncomeThisYear/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/exp-this-year">
                        <Layout><ExpenditureThisYear/></Layout>
                    </PrivateRoute>
                    <PrivateRoute exact path="/all-AuditTrails">
                        <Layout><AllAuditTrails/></Layout>
                    </PrivateRoute>
                    {/* <PrivateRoute path="/admin">
                     <Admin></Admin>
                     </PrivateRoute> */}
                    <Route path="/login">                        
                        <Login/>                        
                    </Route>
                    <Route path="/register">                
                        <Register/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
                <ToastContainer/>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
