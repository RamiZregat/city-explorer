import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Image from 'react-bootstrap/Image';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      lon:'',
      lat:'',
      display_name:'',
      disPlayError: false,
      mapDisplay:false,
      timezone:'',
      countrycode:'',
      statecode:'',
      lonWeather:'',
      latWeather:'',
      Weather:false,
      disPlayWeatherError:false
    }
  }
  getWeatherData=async(CityName)=>{
    let WeatherURL=`http://localhost:3010/weather?cityname=${CityName}`;

    try{
      if(CityName==='Amman'||CityName==='Paris'||CityName==='Seattle'){
      let WeatherData=await axios.get(WeatherURL)
      this.setState({
        timezone:WeatherData.data.timezone,
        countrycode:WeatherData.data.country_code,
        statecode:WeatherData.data.state_code,
        lonWeather:WeatherData.data.lon,
        latWeather:WeatherData.data.lat,
        Weather:true
      })
    }else{
      this.setState({
        disPlayWeatherError:true
      })
    }}
    catch{
      this.setState({
        disPlayWeatherError:true
      })
    }
  }

  getCityData=async(event)=>{
    event.preventDefault();
    let CityName=event.target.cityName.value;
    this.getWeatherData(CityName);
    let Key="pk.e7bf618f9e0781f31c85230b2a6a24f0";
    let URL=`https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${CityName}&format=json`;
    
  

    try{
    let Data= await axios.get(URL);
    this.setState({
      lon:Data.data[0].lon,
      lat:Data.data[0].lat,
      display_name:Data.data[0].display_name,
      mapDisplay:true
    
    })
    }
    catch{
      this.setState({
        disPlayError: true
      })
    }
  }



  

  render() {
    

    const FormStyle = {
      paddingTop:'8%',
      paddingLeft:'3%',
      paddingRight:'3%',
      paddingBottom:'3rem'
    };
    const MapStyling={
      width: '40%',
      display:'block',
      marginLeft:'auto',
      marginRight:'auto'
    }
    const Pstyle={
      paddingLeft:'4.5%',
    }
   const borderStyle={
    borderRadius:'5px',
    marginLeft:'0.7rem'
    };
    const inputStyle={
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    }
    const SubmitStyle={
      width:'100%',
      backgroundColor:'rgb(107 175 76 / 90%)',
      color: 'white',
      padding: '14px 20px',
      margin:'8px 0',
      border: 'none',
      borderRadius:'4px',
      cursor: 'pointer'
    }
    const NavStyle={
      backgroundColor:'#4CAF50',
      color:'white'
    }
    const formColorStyle={
      borderRadius:'5px',
      backgroundColor:'#f2f2f2',
      padding:'20px'
    }
    const errorStyle={
      textAlign:'center',
      fontSize:'5rem'
    }
    const dataStyle={
      borderRadius:'5px',
      backgroundColor:'#f2f2f2',
      padding:'20px',
      margin:'0 75% 0 5%'
    }
    return (
      <>
        <Navbar expand="lg" style={NavStyle}>
          <Container>
            <Navbar.Brand href="#" style={NavStyle}>City Explorer</Navbar.Brand >
          </Container>
        </Navbar>
        <form style={FormStyle} onSubmit={this.getCityData}>
        <div style={formColorStyle}>
          <label>City Name: </label>
          <input style={borderStyle} style={inputStyle} name='cityName' placeholder='Enter city name'></input>
          <button style={borderStyle} type='submit' style={SubmitStyle}>Explore!</button>
        </div>
        </form>
        <div style={dataStyle}>
        <p style={Pstyle}>City name:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.display_name}</p>
        <p style={Pstyle}>Latitude:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.lat}</p>
        <p style={Pstyle}>Longitude:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.lon}</p>
        </div>
        {this.state.mapDisplay && <Image style={MapStyling} src={`https://maps.locationiq.com/v3/staticmap?key=pk.e7bf618f9e0781f31c85230b2a6a24f0&center=${this.state.lat},${this.state.lon}&zoom=${1-18}`} alt='map' fluid />}
        {this.state.disPlayError && <p style={errorStyle}>Sorry Error</p>}
        {this.state.Weather&&<p style={Pstyle}>City name:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.display_name}</p>}
        {this.state.Weather&&<p style={Pstyle}>Latitude:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.latWeather}</p>}
        {this.state.Weather&&<p style={Pstyle}>Longitude:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.lonWeather}</p>}
        {this.state.Weather&&<p style={Pstyle}>Time Zone:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timezone}</p>}
        {this.state.Weather&&<p style={Pstyle}>Country Code:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.countrycode}</p>}
        {this.state.Weather&&<p style={Pstyle}>State Code:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.statecode}</p>}
        {this.state.disPlayWeatherError&&<p style={errorStyle}>Sorry Error</p>}

        
      </>
    );
  }
}

export default App;
