import * as React from 'react';
import './App.css';
import DisplayBox from './Components/DisplayBox';
import PaginationFooter from './Components/PaginationFooter';
import { InitHeader } from './Components/ParallaxScroll';

function App() {
  return (
    <div className="App">
      <div className='section Main-body'>
        <InitHeader/>
        <DisplayBox
          imgSrc={"elina_bear_clear.png"}
          text={"Hi! My name is Elina Yon and I am a software engineer."}/>
      </div>
      <div className='section App-footer'>
        <PaginationFooter/>
      </div>
    </div>
  );
}

export default App;
