import React from 'react';
import  Layout  from '../../landing/Layout';
import { EventForm } from '../components/EventForm/EventForm';
import { useSelector  } from 'react-redux';

function EditEventPage({props}) {
    const eventRdx = useSelector((state) => state.events);
    return (
        <Layout>
               <EventForm isModal={false}  model={eventRdx?.selectedEvent}/>
        </Layout>
    );
}

export default EditEventPage;



