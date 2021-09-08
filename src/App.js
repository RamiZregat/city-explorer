import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Image from 'react-bootstrap/Image';
import Card from'react-bootstrap/Card';
import ListGroup from'react-bootstrap/ListGroup';
import ListGroupItem from'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      weatherArray:[],
      disPlayMoviesError:false,
      moviesDataArray:[],
      Movies:false,
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

  getCityData=async(CityName)=>{ 

 
    
    let Key=process.env.REACT_APP_Key;
    let URL=`https://eu1.locationiq.com/v1/search.php?key=${Key}&q=${CityName}&format=json`;
    
  

    try{
    let Data= await axios.get(URL);
    
    this.setState({
      lon:Data.data[0].lon,
      lat:Data.data[0].lat,
      display_name:Data.data[0].display_name,
      mapDisplay:true,
    
    })
  
    this.getWeatherData(this.state.lat,this.state.lon)
  
    }
    
    catch{
      this.setState({
        disPlayError: true
      })
    }
    
  }
  getMoviesData= async(event)=>{
    event.preventDefault();
    let CityName=event.target.cityName.value;
    let MovieURL=`https://rami-city-explorer.herokuapp.com/movies?moviename=${CityName}`;
    try{
    let moviesData= await axios.get(MovieURL)
    console.log(moviesData);
    this.setState({
      moviesDataArray:moviesData.data,
      Movies:true
    })
    this.getCityData(CityName)
    console.log(this.state.moviesDataArray);
  }
  catch{
    this.setState({
      disPlayMoviesError:true
      
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
    const rowStyle={
      textAlign: 'center',
      marginLeft:'auto',
      marginRight:'auto',
      width:'85%',
      marginTop: '5%'
    }
    const space={
      marginTop:'3%',
      marginBottom:'',
    }
    const dataStyle={
      borderRadius:'5px',
      backgroundColor:'#f2f2f2',
      padding:'20px',
      margin:'0 75% 0 5%'
    }
    const weatherDataStyle={
      borderRadius:'5px',
      backgroundColor:'#f2f2f2',
      margin:'0 15% 0 15%'
    }
    let i=0
    return (
      <>
        <Navbar expand="lg" style={NavStyle}>
          <Container>
            <Navbar.Brand href="#" style={NavStyle}>City Explorer</Navbar.Brand >
          </Container>
        </Navbar>
        <form style={FormStyle} onSubmit={this.getMoviesData}>
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
        {this.state.mapDisplay && <Image style={MapStyling} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_Key}&center=${this.state.lat},${this.state.lon}&zoom=${1-18}`} alt='map' fluid />}
        {this.state.disPlayError && <p style={errorStyle}>Sorry Error</p>}
      <div style={space} style={weatherDataStyle}>
      <Row xs={1} md={3} className="g-4" style={rowStyle}>
        {this.state.Weather && this.state.weatherArray.map(item =>{
          
          i=i+1
          return(
          <>
          <Col>
          <p style={Pstyle}>Day{i}</p>
          <p style={Pstyle}>Date:&nbsp;&nbsp;{item.date}</p>
          <p style={Pstyle}>Description:&nbsp;&nbsp;{item.description}</p>
          </Col>
          </>
          )
        })}
        </Row>
        </div>

        {this.state.disPlayWeatherError&&<p style={errorStyle}>Sorry Error</p>}
        <Row xs={1} md={3} className="g-4" style={rowStyle}>
        {this.state.Movies && this.state.moviesDataArray.map(item =>{
          return(
            <>
            <Col>
            <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.image_url} />
  <Card.Body>
    <Card.Title>Title:&nbsp;&nbsp;{item.title}</Card.Title>
    <Card.Text>
    Overview:&nbsp;&nbsp;{item.overview}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Average votes:&nbsp;&nbsp;{item.average_votes}</ListGroupItem>
    <ListGroupItem>Total votes:&nbsp;&nbsp;{item.total_votes}</ListGroupItem>
    <ListGroupItem>Popularity:&nbsp;&nbsp;{item.popularity}</ListGroupItem>
    <ListGroupItem>Released on:&nbsp;&nbsp;{item.released_on}</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
</Col>
            {/* <p style={Pstyle}></p>
            <p style={Pstyle}></p>
            <p style={Pstyle}></p>
            <p style={Pstyle}></p>
            <img src= alt="Poster"/>
            <p style={Pstyle}></p>
            <p style={Pstyle}></p> */}
            </>
          )
        })}
        </Row>
        {this.state.disPlayMoviesError && <p style={errorStyle}>Sorry Error</p>}
      </>
    );
  }
}

export default App;
