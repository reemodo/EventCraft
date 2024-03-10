import React from 'react'
import dummyData from '../../../../event'
import { EventCard } from './EventCard'
import {Grid, Typography } from '@mui/material';
import { useGetEventsQuery } from "../../api/events.api";
import { useSelector } from "react-redux";
export function Events({inHomePage ,events,  editModel}) {
    
    const groupedEvents = events.reduce((event, obj) => {
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
        <div className='categoryContainer'>
          {inHomePage? Object.entries(groupedEvents).map(([category, items]) => (
            <div key={category}>
              <Typography variant="h4" gutterBottom color="">
                {category.charAt(0).toUpperCase() + category.substring(1)}
              </Typography>
              <Grid container spacing={3}>
                {items.map((event, index) => (
                  <Grid item key={event._id} xs={12} sm={6} md={5} spacing={3}>
                    <EventCard event={event} inHomePage={true}/>
                  </Grid>
                ))}
              </Grid>
            </div>
          )):
          <Grid container spacing={2}>
         { events.map((event, index) => (
            <Grid item key={index} xs={12} sm={6} md={5}>
              <EventCard event={event} inHomePage={false}  editModel={ editModel}/>
            </Grid>
          ))}
          </Grid>}
        </div>
        </>
    )
}
