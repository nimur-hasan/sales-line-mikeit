import * as React from 'react';
import {useContext} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Divider from '@material-ui/icons/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {useHistory} from 'react-router-dom';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {Collapse} from '@mui/material';
import {UserContext} from '../App';

export default function SideBar() {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const history = useHistory()

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClick2 = () => {
        setOpen2(!open2);
    };

    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: '#003358', color: '#fff'}}>
            <nav aria-label="main mailbox folders" className='px-6'>
                <List>
                    {
                        loggedInUser?.user?.isAdmin &&
                        <ListItem disablePadding  className='border-b py-[14px]'>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <img src='/assets/icon_home.png'/>
                                </ListItemIcon>
                                <ListItemText className='text-[50px]' onClick={() => {
                                    history.push("/")
                                }} primary={<div className='text-[22px]'>Dashboard</div>}/>
                            </ListItemButton>
                        </ListItem>
                    }
                    {
                        loggedInUser?.user?.isAdmin &&
                        <ListItem disablePadding  className='border-b py-[14px]'>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#fff"}}>
                                <img src='/assets/icon_start.png'/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/all-users")
                                }} primary={<div className='text-[22px]'>All Users</div>}/>
                            </ListItemButton>
                        </ListItem>
                    }
                    <ListItem disablePadding  className='border-b py-[14px]'>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "#fff"}}>
                                <img src='/assets/icon_state.png'/>
                            </ListItemIcon>
                            <ListItemText onClick={() => {
                                history.push("/add-payment")
                            }} primary={<div className='text-[22px]'>Daily Sales Entry</div>}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding  className='border-b py-[14px]'>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "#fff"}}>
                                <img src='/assets/icon_state.png'/>
                            </ListItemIcon>
                            <ListItemText onClick={() => {
                                history.push("/spent-money")
                            }} primary={<div className='text-[22px]'>Spent Money<br/>( Expenditure )</div>}/>
                        </ListItemButton>
                    </ListItem>
                    {
                        loggedInUser?.user?.isAdmin &&
                        <ListItem disablePadding  className='border-b py-[14px]'>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <img src='/assets/icon_start.png'/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/register-product-or-service")
                                }} primary={<div className='text-[22px]'>Register a<br/>Product / Service</div>}/>
                            </ListItemButton>
                        </ListItem>
                    }

                    {
                        loggedInUser?.user?.isAdmin &&
                        <ListItem disablePadding  className='border-b py-[14px]'>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <img src='/assets/icon_start.png'/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/add-a-new-customer")
                                }} primary={<div className='text-[22px]'>Add a New<br/>Customer</div>}/>
                            </ListItemButton>
                        </ListItem>
                    }

                    {
                        loggedInUser?.user?.isAdmin &&
                        <ListItem disablePadding  className='border-b py-[14px]'>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <img src='/assets/icon_start.png'/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/all-products-or-services")
                                }} primary={<div className='text-[22px]'>All Products /<br/>Services</div>}/>
                            </ListItemButton>
                        </ListItem>
                    }

                    {
                        loggedInUser?.user?.isAdmin &&
                        <ListItem disablePadding  className='border-b py-[14px]'>
                            <ListItemButton>
                                <ListItemIcon sx={{color: "#fff"}}>
                                <img src='/assets/icon_start.png'/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/all-customers")
                                }} primary={<div className='text-[22px]'>All Customers</div>}/>
                            </ListItemButton>
                        </ListItem>
                    }

                    <ListItemButton sx={{padding: '18px', borderBottom: '1px solid white'}} onClick={handleClick}>
                        <ListItemIcon sx={{color: '#fff'}}>
                        <img src='/assets/icon_state.png'/>
                        </ListItemIcon>
                        <ListItemText primary={<div className='text-[22px]'>Income Reports</div>}/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-today")
                                }} primary="Today"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-yesterday")
                                }} primary="Yesterday"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-this-week")
                                }} primary="This Week"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-last-week")
                                }} primary="Last Week"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-this-month")
                                }} primary="This Month"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-last-month")
                                }} primary="Last Month"/>
                            </ListItemButton>

                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/income-this-year")
                                }} primary="This Year"/>
                            </ListItemButton>

                        </List>
                    </Collapse>
                    <ListItemButton sx={{padding: '18px', borderBottom: '1px solid white'}} onClick={handleClick2}>
                        <ListItemIcon sx={{color: '#fff'}}>
                            <img src='/assets/icon_state.png'/>
                        </ListItemIcon>
                        <ListItemText primary={<div className='text-[22px]'>Expenditure Reports</div>}/>
                        {open2 ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/expenditure-today")
                                }} primary="Today"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/expenditure-yesterday")
                                }} primary="Yesterday"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/expenditure-this-week")
                                }} primary="This Week"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/expenditure-last-week")
                                }} primary="Last Week"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/expenditure-this-month")
                                }} primary="This Month"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/expenditure-last-month")
                                }} primary="Last Month"/>
                            </ListItemButton>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon sx={{color: "#fff"}}>
                                    <HistoryOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText onClick={() => {
                                    history.push("/exp-this-year")
                                }} primary="This Year"/>
                            </ListItemButton>
                        </List>
                    </Collapse>


                </List>
            </nav>
        </Box>
    );
}
