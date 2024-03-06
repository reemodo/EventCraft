import React from "react";
import { Card, CardActionArea, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import {useTheme} from "@mui/material";
export const EventCard = ({event}) => {
  const theme  = useTheme();
  return (
  <>
   <Card sx={{ maxWidth: 345 , m : theme.spacing(2) }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://img.freepik.com/free-vector/hand-drawn-wedding-invitation_23-2149091987.jpg?size=626&ext=jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
  </>);
};