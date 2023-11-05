import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [flight, setFlight] = useState({
    destination: 'New York',
    startLocation: 'New Jersey',
    duration: '3h 30m',
    cost: '$250',
    startDate: 'July 15, 2023',
    endDate: 'July 22, 2023'
  });

  const generateNewFlight = () => {
    // Generate new flight details (you can customize this logic)
    const newFlight = {
      destination: 'New Destination',
      startLocation: 'Old Destination',
      duration: 'Xh Xm',
      cost: '$YYY',
      startDate: 'Month DD, YYYY',
      endDate: 'Month DD, YYYY'
    };

    setFlight(newFlight);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">American Airlines</div>
        <ul className="menu">
          <li><a href="#" className='item'>Book a Flight</a></li>
          <li><a href="#" className='item'>Check-In</a></li>
          <li><a href="#" className='item'>Flight Status</a></li>
          <li><a href="#" className='item'>My Trips</a></li>
        </ul>
      </div>
      <div className="container">
        <h1>Flight Search Results</h1>
        <div className="flight-list">
          <div className="flight">
            <div className="flight-info">
            <div className="airplane-image">
              <img src="https://www.aa.com/content/images/homepage/mobile-hero/en_US/Tail.png" alt="American Airlines Airplane" />
            </div>
              <h2>Flight to {flight.destination}</h2>
              <p>Start Location: {flight.startLocation}</p>
              <p>Duration: {flight.duration}</p>
              <p>Cost: {flight.cost}</p>
              <p>Start Date: {flight.startDate}</p>
              <p>End Date: {flight.endDate}</p>
             
              <div className="buttons">
              <button className="yes-button">Book</button>
              <button className="no-button" onClick={generateNewFlight} >Reject</button>
            </div>
            </div>
           
          </div>
        </div>
       
      </div>
      <footer className="footer">
        <p>&copy; 2023 American Airlines. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

