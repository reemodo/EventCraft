import { Box, Grid, Typography, Button } from '@mui/material'
import React from 'react'
import { OurService } from './OurService'
import { TopContainer } from './TopContainer'
import { useNavigate } from 'react-router-dom'
import { UseSelector } from 'react-redux'
export function OurServicesList(props) {
    const list= [
        {title: "Manage Events", description: " Effortlessly create, manage, and customize your events your events anytime."},
        {title: "Customize Event Materials", description: "Access a versatile workspace to design personalized event cards or posters."},
        {title: "Discover and Join Events", description: "Explore and join events hosted by others."},
    ]
const navigate =useNavigate();
const rdxUser = useSelector((state) => state.user);
    return (
        <>
        <Grid container spacing={2} justifyContent="center"
          m='10px' 
         >
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom fontWeight='500;' fontFamily={'Auto'} fontSize={'3vw'} mb={4}>
        Our website offers a comprehensive platform 
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Grid container spacing={2} justifyContent="center">
 
        {list.map((service) => (
                    <Grid item xs={12} sm={6} md={3} key={service.title} sx={{
                      display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 1,
  borderRadius: 2,
  mr: 2,
  padding: "5px",
  mb: 4,
  '&:hover': {
    backgroundColor: '#5c691b33', // Change background color on hover
  }
                    
                    }}onClick={rdxUser.loggedIn?navigate('/workspace'):()=>navigate('/register')} >
                      
                        <OurService title={service.title} description={service.description} />
                        
                    </Grid>
                ))}

        </Grid>
      </Grid>
    </Grid>
        </>
    )
}
