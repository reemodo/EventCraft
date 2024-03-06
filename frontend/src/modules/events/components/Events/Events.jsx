import React from 'react'
import dummyData from '../../../../event'
import { EventCard } from './EventCard'
import {Grid, Typography } from '@mui/material';

export function Events(props) {

    const groupedEvents = dummyData.reduce((event, obj) => {
        const { category, ...rest } = obj;
        if (!event[category]) {
            event[category] = [rest]; // Create a new array for the category
        } else {
            event[category].push(rest); // Push the object to the existing array
        }
        return event;
      }, {});
    return (
        <>
        <div>
      {Object.entries(groupedEvents).map(([category, items]) => (
        <div key={category}>
          <Typography variant="h4" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {items.map((event, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </div>
        </>
    )
}
