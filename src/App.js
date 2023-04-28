import * as React from 'react';
import './App.css';
import DisplayBox from './Components/DisplayBox';
import PaginationFooter from './Components/PaginationFooter';
import ParallaxBody from './Components/ParallaxBody';

function App() {
  return (
    <div className="App">
      <div className='Main-body'>
        <ParallaxBody/>
      </div>
      <div className='App-footer'>
        <PaginationFooter/>
      </div>
    </div>
  );
}

export default App;
