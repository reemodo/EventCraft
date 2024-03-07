import React from 'react'
import { Events } from '../../components/Events/Events'
import "./workSpace.css"
import { useTheme } from "@mui/material";
import { Icon } from '@mui/material';
import { useState } from 'react';
import { EventFormModal } from "../../components/EventFormModal/EventFormModal"
export function WorkSpace(props) {
  const theme  = useTheme();
  const [OpenCreateModel, setOpenCreateModel] = useState(false);
  const onOpenCreateModel = () => {
    setOpenCreateModel(true);
  };
  const onCloseCreateModel = () => {
    setOpenCreateModel(false);
  };
//TODO : 
  return (
    <>
    <div className='homeContainer'>
      <div className='iconContainer' onClick={onOpenCreateModel} >
        
        <Icon sx={{ 
          color: "secondary.contrastText", 
          backgroundColor: "secondary.main",
          '--Grid-borderWidth': '1px',
          borderRadius:"40px",
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderRight: 'var(--Grid-borderWidth) solid',
          borderBottom: 'var(--Grid-borderWidth) solid',
          borderColor: 'secondary.main',
          width: 50,
          height: 50,
          fontSize: "2.3rem"
        }}>+</Icon>
      </div>
      <Events inHomePage={false}/>
      <EventFormModal isOpen={OpenCreateModel} onClose={onCloseCreateModel} />
    </div>
    </>
  )
}
