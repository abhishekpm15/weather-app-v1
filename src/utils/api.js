const API_KEY=process.env.REACT_APP_API_KEY

const fetchData = async city => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=Metric`
    )
    if (response.ok) {
      const data = response.json()
      return data
    } else {
      console.log('error')
      return null
    }
  } catch (err) {
    console.log('error', err)
  }
}

export default fetchData
