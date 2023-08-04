import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import { Avatar } from '@mui/material';

const pages = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

    const [loggedInUser, setLoggedInUser] = React.useContext(UserContext)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const history = useHistory();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className="bg-[#003358] px-[52px] py-[22px] flex justify-between items-center">
            <Link to='/'><img src="/assets/logo-horizontal.png" alt="" /></Link>
            <div className="text-white flex items-center gap-[22px]">
                <p className='text-[20px]'>Welcome <span className='font-semibold'>Username!</span></p>
                <div className="h-[50px] w-[50px] rounded-full border-[#003358] border-[5px] bg-white" style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}></div>
                <button className='bg-[#B38B00] text-[20px] py-[14px] px-[42px] rounded-[17px]'>Log Out</button>
            </div>
        </div>
    );
};
export default ResponsiveAppBar;
