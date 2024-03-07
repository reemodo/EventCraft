import React from 'react'
import { Events } from '../../components/Events/Events'
import "./home.css"
import SearchBar  from './SearchBar' 
export function Home(props) {
  return (
    <>
    <div className='homeContainer'>
      <SearchBar/>
      <Events inHomePage={true}/>
    </div>
    </>
  )
}
