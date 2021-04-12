import React, { Component } from 'react';
import Weather from './Weather';

export default class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      isLoaded: false
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          isLoaded: true

        });
      }, (error) => {
        alert("Geolocation blocked!");
      })
    }
    else {
      alert("Geolocation disabled!");
    }
  }

  render() {
    const { lat, lng, isLoaded } = this.state;

    if (isLoaded) {
      return (
        <div>
          <h3>Your position is:</h3>
          <p>{lat.toFixed(3)}, {lng.toFixed(3)}</p>
          <Weather lat={lat} lng={lng} />
        </div>
      )
    }
    else {
      return <p>Getting your location...</p>
    }
  }
}
