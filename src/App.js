import * as React from 'react';
import './App.css';
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from './Components/libraries';
import { Header, Slides, Footer}  from './Components/Slides';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  return (
    <div className="App">
      <div className='Main-body'>
        <Header/>
        <Slides/>
      </div>
      <div className='App-footer'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
