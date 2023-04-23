import React from 'react';
import { Divider, Grid, Paper} from "@mui/material";
import Sidenav from './Sidenav';
import Messageboard from './Messageboard';
import { display } from '@mui/system';



const Dashboard = () => {
  return (
    <div>
      <Grid component={Paper} container spacing={2} sx={{width:"100%", marginTop:"10px",  height:"90vh"}} variant='outlined' square>
        <Grid item md={3} sx={{display : "flex" ,flexDirection : "row"}}>
        <Divider variant='middle'/>
          <Sidenav/>
        </Grid>
        <Grid item md={9}>
          <Messageboard/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
