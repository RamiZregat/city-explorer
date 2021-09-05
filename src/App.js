import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      lon:'',
      lat:'',
      display_name:'',
      disPlayError: false
    }
  }

  getCityData=async(event)=>{
    event.preventDefault();
    let CityName=event.target.cityName.value;
    let Key="pk.187e19748e6b7d412b6f784bf36db13e"
    let URL=`https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${CityName}&format=json`

    try{
    let Data= await axios.get(URL);
    this.setState({
      lon:Data.data[0].lon,
      lat:Data.data[0].lat,
      display_name:Data.data[0].display_name
    
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
      paddingTop:'15%',
      paddingLeft:'3%',
      paddingRight:'3%',
      paddingBottom:'3rem'
    };
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
    const divStyle={
      borderRadius:'5px',
      backgroundColor:'#f2f2f2',
      padding:'20px'
    }
    return (
      <>
        <Navbar expand="lg" style={NavStyle}>
          <Container>
            <Navbar.Brand href="#" style={NavStyle}>City Explorer</Navbar.Brand >
          </Container>
        </Navbar>
        <form style={FormStyle} onSubmit={this.getCityData}>
        <div style={divStyle}>
          <label>City Name: </label>
          <input style={borderStyle} style={inputStyle} name='cityName' placeholder='Enter city name'></input>
          <button style={borderStyle} type='submit' style={SubmitStyle}>Explore!</button>
        </div>
        </form>
        <p style={Pstyle}>City name: {this.state.display_name}</p>
        <p style={Pstyle}>Latitude: {this.state.lat}</p>
        <p style={Pstyle}>Longitude:  {this.state.lon}</p>
        {this.state.disPlayError && <p style={Pstyle}>Sorry Error</p>}
      </>
    );
  }
}

export default App;
