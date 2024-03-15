import React, { useEffect, useState } from 'react';
import  Layout  from '../../landing/Layout';
import { EventForm } from '../components/EventForm/EventForm';
import { useEventHelpers } from "../hooks/useEventHelper"
import { rdxEventsActions } from '../rdx/events.rdx';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


function EditEventPage({props}) {
    const { id } = useParams();
    const [event, setEvent] = useState();
    
    const { getEvent, pendingGetEvent } = useEventHelpers();
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      (async () => {
        if (id) {
          const eventData = await getEvent(id);
          if (eventData) {
            setEvent(eventData);
            dispatch(rdxEventsActions.setSelectedEvent(eventData));

          }
        }
    })();
    }, [id, getEvent, dispatch]);
    if(pendingGetEvent)
    return <div>Loading...</div>
    if(!event || event.length === 0){
        return <div>empty</div>
    }
    return (
        <Layout>
               <EventForm isModal={false}  model={event}/>
        </Layout>
    );
}

export default EditEventPage;



