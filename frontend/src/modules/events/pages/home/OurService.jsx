import { Typography, Box } from '@mui/material'
import React from 'react'
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import {  ElectricBoltRounded } from '@mui/icons-material'; // Assuming you have your own icon components
import { ReactComponent as JoinEventIcon } from './IconsSource/joinEvent.svg';
import { ReactComponent as EditEventIcon  } from './IconsSource/editEvent.svg';
import { ReactComponent as ManageEventIcon  } from './IconsSource/manageEvents.svg';
export function OurService({ title, description }) {
    const handelIcon = () =>{
        if(title === 'Manage Events')
        return <ManageEventIcon width='90px' fill='rgb(170 194 43)'/>
        if(title === 'Customize Event Materials')
        return <EditEventIcon width='90px' fill='rgb(170 194 43)'/>
        if(title === "Discover and Join Events")
        return<JoinEventIcon width='90px' fill='rgb(170 194 43)'/>
    }

          
       
    return (<>

                    <Box sx={{display:" flex;",
    alignSelf: "center;"}}>
                    {handelIcon()}
                    </Box>
                    <Typography variant="h6"   textAlign= 'left; !important'> {title}</Typography>
                    <Typography variant="body1"   paddingTop= '3%;'
    textAlign= 'left;'
    margin= '0;'
    fontFamily='"Roboto", "Helvetica", "Arial", sans-serif;'
    fontweight= '400;'
    font-size= '1.2vw'
    line-height= '1.5;'
    letter-spacing= '0.00938em;'
    background='white'
    padding=" 10px;"
    paddingLeft=" 0px;"
   >
                        {description}
                    </Typography>
     </>
    )
}
