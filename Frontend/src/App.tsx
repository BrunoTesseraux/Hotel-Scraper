import './App.scss';
import ChartTest from './assets/components/ChartTest/ChartTest';
import HotelSelector from './assets/components/HotelSelector/HotelSelector';
import SignIn from './assets/components/SignIn/SignIn';
import SignUp from './assets/components/SignIn/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Weil ich die möglichkeit immer vergesse die h1 derweil */}
      <div>
        <h1>Hotel Scraper</h1>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hotelselector" element={<HotelSelector />} /> {/* Default route */}
          <Route path="/" element={<ChartTest/>} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;