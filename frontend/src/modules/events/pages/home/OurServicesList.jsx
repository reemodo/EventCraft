import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { OurService } from './OurService'
import { TopContainer } from './TopContainer'
export function OurServicesList(props) {
    const list= [
        {title: "Manage Events", description: " Effortlessly create, manage, and customize your events while retaining full control over participant lists and event details."},
        {title: "Customize Event Materials", description: "Access a versatile workspace to design personalized event cards or posters, ensuring your event stands out and leaves a lasting impression."},
        {title: "Discover and Join Events", description: "Explore a diverse array of events hosted by others in your community and seamlessly join those that pique your interest, fostering connections and shared experiences."},
    ]

    return (
        <>
        <Grid container spacing={2} justifyContent="center"
          m='10px'  marginTop='100px' 
         >
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom fontWeight='500;' fontFamily={'Auto'} fontSize={'3vw'} mb={4}>
        Our website offers a comprehensive platform 
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Grid container spacing={2} justifyContent="center">
 
        {list.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.title} sx={{
                      display: 'flex',
                      flexDirection: 'column;',
                      justifyContent: 'center;',
                      alignItems: 'center;'
                    }} >
                        <OurService title={service.title} description={service.description} />
                    </Grid>
                ))}

        </Grid>
      </Grid>
    </Grid>
        </>
    )
}
