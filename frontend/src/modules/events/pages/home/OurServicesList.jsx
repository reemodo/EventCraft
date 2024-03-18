import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { OurService } from './OurService'

export function OurServicesList(props) {
    const list= [
        {title: "Mange you Event", description: "Create an Event and see the participate and edit you event any time"},
        {title: "Design your Event Card", description: "You will have a greet workSpace to design your card or poster"},
        {title: "Join Other People Events", description: "You can see other people events and join them"},
    ]

    return (
        <>
        <Grid container spacing={2} justifyContent="center"
          m='10px' marginBottom='100px' marginTop='100px' boxShadow={3}
         borderRadius={10} p={5}
         backgroundColor='white'  width= 'calc(97% + 0px)'
         >
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Grid container spacing={2} justifyContent="center">
 
        {list.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.title}>
                        <OurService title={service.title} description={service.description} />
                    </Grid>
                ))}

        </Grid>
      </Grid>
    </Grid>
        </>
    )
}
