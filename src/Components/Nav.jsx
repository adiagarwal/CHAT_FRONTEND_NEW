import React , {useState , useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import {Menu , MenuItem , Link , IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link as RouterLink} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {userContext} from "../Context/userContext";

export default function Nav() {

  const {user , setUser} = useContext(userContext)

  const navigate = useNavigate(null)

  const [anchorEl, setanchorEl] = useState(null);

  const handleClick = (event) =>{
    event.stopPropagation();
    setanchorEl(event.currentTarget)
  }

  const open = Boolean(anchorEl)

  const handleClose = (event) =>{
    setanchorEl(null)
  }

  const handleMenuClick = (event) =>{
    event.stopPropagation();
    localStorage.clear('accessToken')
    navigate('/login')
    setUser(null)
  }

  console.log(user)
  
  return (
    <Box sx={{ flexGrow: 0}}>
      <AppBar position="static" sx={{background : "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"}}>
        <Toolbar>
          <Typography variant='h5' sx={{fontStyle:"italic"}}>
            @MeChat
          </Typography>
          <Stack direction={"row"} sx={{marginLeft:"auto" , display: " flex"}} spacing={4}>
            <Link underline='none' display={user ? "none" : "inline"} component={RouterLink} to="/login" color='inherit' >Login</Link>
            <Link underline='none' display={user ? "none" : "inline"} component={RouterLink} to="/signup"  color='inherit' >SignUp</Link>
            <IconButton sx={!user ? {display : "none"} : {display : "inline"}} onClick={handleClick}><AccountCircleIcon fontSize="large" color='inherit'/></IconButton>
            <Menu id="account-menu" sx={!user ? {display : "none"} : {display : "inline"}} anchorEl={anchorEl} open={open} MenuListProps={{"aria-labelledby":"account-button"}} onClose={handleClose}>
                <MenuItem onClick={handleMenuClick}>Logout</MenuItem>
            </Menu>  
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}