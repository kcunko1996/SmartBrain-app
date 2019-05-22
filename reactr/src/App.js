import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';
const  app = new Clarifai.App({
  apiKey: '5681e581ae5f4fd38ba0b9c3864b4a3f'
});


class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      box: {},
      route: 'SignIn',
      IsSigned: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }
 
  calculetFaceLocation = (data) => {
    const clarifaiBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('slika');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      //Izracunjavanje bounding boxa
      left: clarifaiBox.left_col * width,
      top: clarifaiBox.top_row * height,
      right: width -(clarifaiBox.right_col * width),
      bottom: height - (clarifaiBox.bottom_row * height)
    }
  
  }

  dispFaceBox = (box) => {
    this.setState({box: box})
    
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onSubmit = () => {
    this.setState({ImageUrl: this.state.input})
   

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then( response =>{
      if(response){
        fetch('https://shielded-meadow-33531.herokuapp.com/image',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            id: this.state.user.id
          })
        }).then(res => res.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
      }
      this.dispFaceBox(this.calculetFaceLocation(response))
    })
    .catch( err =>console.log(err));
  }
  onRouteChange = (route) => {
    if(route === 'SignIn'){
      this.setState({IsSigned: false})
    
    }
    else if (route === 'Home') {
      this.setState({IsSigned: true})
    }
    this.setState({route: route});
   
    
  }
  loadUser = (data) => {
    this.setState({user: {
       id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        eneteries:  data.eneteries,
        joined:  data.joined
    }})
  }
  
  render() { 
    const { input,box,route,IsSigned } = this.state;
    return (
      <div className="App">
      <Navigation onRouteChange ={this.onRouteChange} IsSigned={IsSigned}  />
        { route === 'Home' ? <div> 
          <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries}/>
         <ImageLinkForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={box} ImageUrl={input} /> 
        </div>
        : 
        (route === 'SignIn' 
        ?<SignIn loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/> 
        : <Register onRouteChange ={this.onRouteChange} loadUser={this.loadUser}/> 
        ) 
      
        
    }
      </div>
    );
  }
}

export default App;
