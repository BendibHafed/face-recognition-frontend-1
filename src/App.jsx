import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';
import ParticlesBg from 'particles-bg'
import './App.css'
import {  API_URL } from './config'


const initialState  = {
    input: '',
    imageUrl: '', 
    box: {},
    route: 'signin',
    isSignedIn: false,
    user : {
      email: '',
      id: '',
      name: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState(
      {
        user: 
        {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }  
     })
    }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    if (!image) {
    console.error('No image found when calculating face location.');
    return {};  // or return null or something safe
  }
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
    
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    
    fetch(`${API_URL}/image`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id,
        imageUrl: this.state.input
      })
    })
      .then(response => {
        if (!response.ok) {
          // Return a rejected promise to trigger catch
          return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
        }
        return response.json();
      })
      .then(data => {
        if (!data.faceData) {
          throw new Error('No face data received from server');
        }
        
        this.displayFaceBox(this.calculateFaceLocation({ outputs: [data.faceData] }));
        
        this.setState(prevState => ({
          user: {
            ...prevState.user,
            entries: data.entries
          }
        }));
        return true; // Explicit return for async operations
      })
      .catch(err => {
        console.error("API Error:", err);
        this.setState({ error: err.message });
        return false; // Explicit return for async operations
      });
    };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    } 
    this.setState({route: route});
  }

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} num={300} color="#dfe7ed"/> {/* "color","ball","lines","thick","circle","cobweb","polygon","square","tadpole","fountain","random","custom" */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={ this.onPictureSubmit }/>
            <FaceRecognition box={box} imageUrl={imageUrl}
            />
          </div>
        : (
          route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}
export default App;

