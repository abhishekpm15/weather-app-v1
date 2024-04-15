import React from 'react'
const Weather = ({ image }) => {
  return (
    <div>
      <img src={image} alt='cloud' width='220px' height='220px'></img>
    </div>
  )
}

export default Weather
