import React from 'react'
import { Events } from '../components/Events/Events'
import "./home.css"
export function Home(props) {
  return (
    <>
    <div className='homeContainer'>
      <Events/>
    </div>
    </>
  )
}
