import React from 'react';

const apiURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "a8ed3f69d2b6ec30316854407b08eca9";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      wind_speed: 0,
      wind_direction: 0,
      description: "",
      icon: "",
      isLoaded: false
    }
  }

  componentDidMount() {
    const url = apiURL +
      "lat=" + this.props.lat +
      "&lon=" + this.props.lng +
      "&units=metric" +
      "&appid=" + apiKey;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            temp: result.main.temp,
            wind_speed: result.wind.speed,
            wind_direction: result.wind.deg,
            description: result.weather[0].description,
            icon: result.weather[0].icon,
            isLoaded: true
          })
        },
        (error) => {
          alert(error);
        }
      )
  }

  render() {
    const { temp, wind_speed, wind_direction, description, icon, isLoaded } = this.state;
    const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    console.log(icon_url);
    
    if (isLoaded) {
      return (
        <div>
        <h3>Weather at your location:</h3>
        <p>{temp} C&#176; </p>
        <p>{wind_speed} m/s {wind_direction} degrees</p>
        <p>{description}</p>
        <img src={icon_url}></img>
      </div>
      )
    }
    else {
      return <p>Getting the weather at your location...</p>
    }
 
  }
}
