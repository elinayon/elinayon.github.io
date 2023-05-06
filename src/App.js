import * as React from 'react';
import './App.css';
import DisplayBox from './Components/DisplayBox';
import PaginationFooter from './Components/PaginationFooter';
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from './Components/libraries';
import ParallaxBody, { InitIntro, InitHeader, Slides }  from './Components/ParallaxBody';
// import Slides from './Components/Slides';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  return (
    <div className="App">
      <div className='Main-body'>
        <InitHeader/>
        {/* <ParallaxBody/> */}
        {/* <InitHeader/>
        <InitIntro/> */}
        <Slides/>
      </div>
      <div className='App-footer'>
        <PaginationFooter/>
      </div>
    </div>
  );
}

export default App;
