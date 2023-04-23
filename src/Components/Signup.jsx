import {Box , Button, Card , CardContent , Stack, TextField, Typography } from "@mui/material";
import React , {useState} from "react";
import {toast } from "react-toastify";
import {useMutation} from "@apollo/client";
import {client , authclient} from "../Graphql/apolloClient";
import {SIGNUP} from "../Graphql/mutations";
import {useNavigate} from "react-router-dom";
// import {TOASTIFY_THEME} from "../Constants/constant"
const Signup = () => {
    let input = {username : "" , email :"" , password:"" , confirmpassword:""}
    let navigate = useNavigate(null)

    const [formData , setformData] = useState(input)
    const [signUp , {data : signUpUser, error}] = useMutation(SIGNUP,{client : authclient})

    const handleChange = (event) =>{
        setformData({...formData , [event.target.name] : event.target.value})
    }

    const handleClick =() =>{
        signUp({variables:formData})
    }

    if(error){
        toast.error('Something Went Wrong !')
    }

    if(signUpUser){
        toast.success('SignedUp Successfully !', {autoClose : 3000 , position : 'top-right'})
        setTimeout(() => navigate('/login') , 2000)
    }
  return (
    <div>
      <Box width={"350px"} sx={{margin:"auto" , marginTop:"50px"}}>
        <Card>
            <CardContent>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Typography variant='h5' sx={{fontStyle:"italic"}} color="Orange">@MeChat</Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField variant='outlined' name="username" label="Username" onChange={handleChange}>Username</TextField>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField variant='outlined' name='email' label="Email" onChange={handleChange}>Email</TextField>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField variant='outlined' name='password' type={"password"} label="Password" onChange={handleChange}>Password</TextField>
                    </Stack>
                    <Stack spacing={2}>
                        <TextField variant='outlined' name='confirmpassword' type={"password"} label="Confirm Password" onChange={handleChange}>Confirm Password</TextField>
                    </Stack>
                    <Stack spacing={2}>
                        <Button sx={{background : "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", color:"white"}} onClick={handleClick}>SignUp</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
      </Box>
      
    </div>
  );
}

export default Signup;