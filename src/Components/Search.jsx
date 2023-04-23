import React , {useEffect} from 'react';
import {Autocomplete , TextField} from "@mui/material";
import User from './User';
import { useLazyQuery } from '@apollo/client';
import { client} from "../Graphql/apolloClient";
import { GET_ALL_USERS } from "../Graphql/query";
const Search = () => {
    const [getAllUsers , {data : allUsersData}] = useLazyQuery(GET_ALL_USERS,{client : client})
    let usersArray = [] ;

    useEffect(()=>{
        getAllUsers()
    },[])

   if(allUsersData){
        let {getAllUsers} = allUsersData
        let {data} = getAllUsers
        usersArray.push(...data)
   } 
   
  return (
    <div >
      <Autocomplete  sx={{marginTop:"30px"}}  options={usersArray}  getOptionLabel={(option) => option._id} renderOption={(props , option ,state) => <User user={option} bg={false}/>} renderInput={(params) => <TextField variant='standard'  color='warning' placeholder='Search Your Friends ...' {...params}/>} freeSolo/>
    </div>
  );
}

export default Search;
