import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App () {
  const [climate, setClimate] = useState()
  console.log('climate change',climate)

  return (
    <div className={`App flex flex-col`}>
      <Card climate = {climate} setClimate = {setClimate}/>
    </div>
  )
}

export default App
