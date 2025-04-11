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


const returnClarifaiJSONRequestOptions = (imageUrl) => {
  const PAT = '252ed517949f435fa5d36d42fe0db88f';
  const USER_ID = 's07ct5ryuzbx';
  const APP_ID = 'face-recognition-app';

  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  //const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;  
  }


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '', 
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
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
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

      // Use the proxy URL (/clarifai) instead of direct API call (Just for Devlopment)
    fetch("/clarifai/v2/models/" + 'face-detection' + "/outputs", returnClarifaiJSONRequestOptions(this.state.input))
      .then(response => response.json())
      .then(response => { this.displayFaceBox(this.calculateFaceLocation(response));
        if (response) {
          fetch('http://localhost:5173/face-recognition-fullstack-1', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: this.state.user?.id }),
          })
          .then(response => response.json())
          .catch(err => console.log('Backend error:', err));
        }
      })
      .catch(error => console.log('error', error));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
  }

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} num={100} color="#ffff63"/> {/* "color","ball","lines","thick","circle","cobweb","polygon","square","tadpole","fountain","random","custom" */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={ this.onButtonSubmit }/>
            <FaceRecognition box={box} imageUrl={imageUrl}
            />
          </div>
        : (
          route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}
export default App;

