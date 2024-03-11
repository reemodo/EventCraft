import React from 'react';
import  Layout  from '../../landing/Layout';
import { EventForm } from '../components/EventForm/EventForm';
function EditEventPage({props}) {
    return (
        <Layout>
               <EventForm isModal={false}/>
        </Layout>
    );
}

export default EditEventPage;



