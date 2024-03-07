import React from 'react'
import { Events } from '../../components/Events/Events'
import "./workSpace.css"
export function WorkSpace(props) {
  return (
    <>
    <div className='homeContainer'>
      <Events inHomePage={false}/>
    </div>
    </>
  )
}
