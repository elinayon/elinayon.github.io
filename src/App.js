import * as React from 'react';
import './App.css';
import DisplayBox from './Components/DisplayBox';
import PaginationFooter from './Components/PaginationFooter';

function App() {
  const [state, updateState] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = (event) => {
      updateState(window.scrollX);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="App">
      <div className='section Main-body'>
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
