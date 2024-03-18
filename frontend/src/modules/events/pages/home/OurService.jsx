import { Typography, Grid } from '@mui/material'
import React from 'react'
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import {  ElectricBoltRounded } from '@mui/icons-material'; // Assuming you have your own icon components
import { ReactComponent as JoinEventIcon } from './IconsSource/joinEvent.svg';
import { ReactComponent as EditEventIcon  } from './IconsSource/editEvent.svg';
import { ReactComponent as ManageEventIcon  } from './IconsSource/manageEvents.svg';
export function OurService({ title, description }) {
    const handelIcon = () =>{
        if(title === 'Mange you Event')
        return <ManageEventIcon width='100px' fill='rgb(170 194 43)'/>
        if(title === 'Design your Event Card')
        return <EditEventIcon width='100px' fill='rgb(170 194 43)'/>
        if(title === "Join Other People Events")
        return<JoinEventIcon width='100px' fill='rgb(170 194 43)'/>
    }

          
       
    return (<>

                    <div textAlign="center" width="400px">
                    {handelIcon()}
                    </div>
                    <Typography variant="h6"> {title}</Typography>
                    <Typography variant="body1" maxWidth='60%'>
                        {description}
                    </Typography>
     </>
    )
}
