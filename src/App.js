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
      Weather:false,
      disPlayWeatherError:false,
      weatherArray:[]
    }
  }
  getWeatherData=async(lat,lon)=>{
    let WeatherURL=`https://rami-city-explorer.herokuapp.com/weather?lat=${lat}&lon=${lon}`;

    try{
      
      let WeatherData=await axios.get(WeatherURL)
      
      this.setState({
        weatherArray:WeatherData.data,
        Weather:true
      })
    }
    catch{
      this.setState({
        disPlayWeatherError:true
      })
    }
  }

  getCityData=async(event)=>{ 
    event.preventDefault();
    let CityName=event.target.cityName.value;
    let Key=process.env.REACT_APP_Key;
    let URL=`https://eu1.locationiq.com/v1/search.php?key=pk.43fed3791d35ddb76aa14f749c6d3080&q=${CityName}&format=json`;
    
  

    try{
    let Data= await axios.get(URL);
    
    this.setState({
      lon:Data.data[0].lon,
      lat:Data.data[0].lat,
      display_name:Data.data[0].display_name,
      mapDisplay:true
    
    })
    this.getWeatherData(this.state.lat,this.state.lon)
    
  
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
        {this.state.mapDisplay && <Image style={MapStyling} src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}&zoom=${1-18}`} alt='map' fluid />}
        {this.state.disPlayError && <p style={errorStyle}>Sorry Error</p>}

        {this.state.Weather && this.state.weatherArray.map(item =>{
          return(
            <>
          <p style={Pstyle}>Date:&nbsp;&nbsp;{item.date}</p>
          <p style={Pstyle}>Description:&nbsp;&nbsp;{item.description}</p>
          </>
          )
        })}

        {this.state.disPlayWeatherError&&<p style={errorStyle}>Sorry Error</p>}

        
      </>
    );
  }
}

export default App;
