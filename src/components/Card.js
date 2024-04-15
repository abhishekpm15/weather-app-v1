import React, { useState } from 'react'
import {
  Card as CardModal,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react'
import { FaSearch } from 'react-icons/fa'
import Weather from './Weather'
import Sun from '../assets/sun.png'
import Snow from '../assets/snow.png'
import Storm from '../assets/storm.png'
import Wind from '../assets/wind.png'
import Windy from '../assets/windy.png'
import Humidity from '../assets/humidity.png'
import Cloud from "../assets/cloud.png"
import Rain from "../assets/rain.png"
import PartlyCloudy from "../assets/partly_cloudy.png"
import PartlySunny from "../assets/partly_sunny.png"
import Moon from "../assets/moon.png"
import Clouds from "../assets/clouds.png"

import fetchData from '../utils/api'

const Card = ({climate, setClimate}) => {
  const [searchText, setSearchText] = useState('')
  const [temp, setTemp] = useState(10)
  const [image, setImage] = useState(Wind)
  const [city, setCity] = useState('CITY')
  const [country, setCountry] = useState('COUNTRY')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [wind, setWind] = useState(0)
  const [humid, setHumid] = useState(0)
  // const [climate, setClimate] = useState(null)

  const imageMap = {
    "01d": Sun,
    "01n": Moon,

    "02d": PartlySunny,
    "02n": Moon,

    "03d": Cloud,
    "03n": Cloud,

    "09d": PartlyCloudy,
    "09n": Moon,

    "10d": Rain,
    "10n": Rain,

    "11d": Storm,
    "11n": Storm,

    "13d": Snow,
    "13n": Snow

  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    if (searchText.length > 0) {
      const response = await fetchData(searchText)
      setTemp(response.main.temp)
      console.log("temp",temp)
      setHumid(response.main.humidity)
      setWind(response.wind.speed)
      setCity(response.name)
      setLat(response.coord.lat)
      setLong(response.coord.lon)
      setCountry(response.sys.country)
      const temperature =response.main.temp
      if(imageMap[response?.weather[0]?.icon]){
        setImage(imageMap[response?.weather[0]?.icon])
        console.log("image found")
      }
      else{
        console.log("Temp", temp)
        if(temperature <= 20){
          setImage(Clouds)
        }
        else if(temperature <= 32){
          setImage(PartlySunny)
        }
        else if(temperature > 32){
          setImage(Sun)
        }
        console.log("image not found")
      }
      // console.log('response',imageMap[response?.weather[0]?.icon])
      console.log(response)
      // console.log(response?.weather[0]?.icon[2])
      if(response?.weather[0]?.icon[2] === 'n'){
        setClimate(Moon)
      }
      else{
        setClimate(Sun)
      }
    } else {
      console.log('search text should not be empty')
    }
  }
  return (
    <CardModal className={`w-[350px] sm:w-96 shadow-2xl shadow-cyan-300 ${temp <= 20 ? "shadow-cyan-300 " : "shadow-orange-400"} ` }>
      <div className='mb-10 mt-5 w-full flex justify-center items-center relative '>
        <FaSearch className='text-gray-400 absolute left-12 sm:left-16' />
        <input
          type='search'
          placeholder='Search'
          className='w-72 border-2 border-blue-400 rounded-xl h-10 px-10 outline-none'
          onChange={e => {
            setSearchText(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <CardHeader color='white' className={`relative h-60 flex justify-center`}>
        <Weather image={image} />
      </CardHeader>
      <CardBody>
        <Typography variant='h5' color='blue-gray' className='text-2xl'>
          {temp}°C
        </Typography>
        <Typography variant='h5' color='blue-gray' className='mt-4 text-4xl text-yellow-900'>
          {city}
        </Typography>
        <Typography variant='h4' className='mt-2'>
          {country}
        </Typography>
        
        <div className='flex justify-evenly mt-5'>
          <div>
            <Typography className='text-base font-semibold'>
              Latitude
            </Typography>
            <Typography className='font-semibold'>{Math.ceil(lat)}</Typography>
          </div>
          <div>
            <Typography className='text-base font-semibold'>
              Longitude
            </Typography>
            <Typography className='font-semibold'>{Math.ceil(long)}</Typography>
          </div>
        </div>

        <div className='flex justify-between px-5 mt-5'>
          <div className='flex flex-col items-center w-24'>
            <img src={Windy} height='50px' width='50px' alt='windy'></img>
            <Typography variant='h6' color='blue-gray'>
              {wind + " km/hr"}
            </Typography>
          </div>

          <div className='flex flex-col items-center w-24'>
            <img src={Humidity} height='50px' width='50px' alt='windy'></img>
            <Typography variant='h6' color='blue-gray'>
              {humid +"%"}
            </Typography>
          </div>
        </div>
      </CardBody>
    </CardModal>
  )
}

export default Card
