import {Box , Button, Card , CardContent , Stack, TextField, Typography} from "@mui/material";
import React , {useState} from "react";
import {useMutation} from "@apollo/client";
import {client} from "../Graphql/apolloClient";
import {SIGNIN} from "../Graphql/mutations";
import {toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Signin = () => {

    let input = {email : "" , password : ""}

    let navigate = useNavigate(null)
    
    const [formData , setformData] = useState(input)

    const [signIn , {data : loginUser , error}] = useMutation(SIGNIN,{client : client})

    const handleChange = (event) =>{
        setformData({...formData , [event.target.name] : event.target.value})
    }

    const handleClick = () =>{
        signIn({variables:formData})
    }

    if(error){
        toast.error('Something Went Wrong !')
    }

    if(loginUser){
        let {signin} = loginUser
        let {data} = signin
        if(!data){
            toast.error('User not found !')
        }
        else{
            localStorage.setItem('accessToken', data)
            toast.success('Login Successfully !', {autoClose : 3000 , position : 'top-right'})
            setTimeout(() => navigate('/dashboard') , 2000)
        }  
    }

    return (
      <div>
        <Box width={"350px"} sx={{margin:"auto" , marginTop:"70px"}}>
          <Card>
              <CardContent>
                  <Stack spacing={4}>
                      <Stack spacing={2}>
                          <Typography variant='h5' sx={{fontStyle:"italic"}} color="Orange">@MeChat</Typography>
                      </Stack>
                      <Stack spacing={2}>
                          <TextField variant='outlined' label="Email" name='email' onChange={handleChange}>Email</TextField>
                      </Stack>
                      <Stack spacing={2}>
                          <TextField variant='outlined' label="Password" type={"password"} name='password' onChange={handleChange}>Password</TextField>
                      </Stack>
                      <Stack spacing={2}>
                          <Button sx={{background : "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)", color:"white"}} onClick={handleClick}>Login</Button>
                      </Stack>
                  </Stack>
              </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
  
  export default Signin;
  