import * as React from 'react';
import './App.css';
import DisplayBox from './Components/DisplayBox';
import PaginationFooter from './Components/PaginationFooter';

function App() {
  return (
    <div className="App">
      <section className='Main-body'>
        <DisplayBox
          imgSrc={"elina_bear"}
          text={"hello this is a bio placeholder"}/>
      </section>
      <div className='App-footer'>
        <PaginationFooter/>
      </div>
    </div>
  );
}

export default App;
