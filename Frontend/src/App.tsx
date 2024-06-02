import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChartTest from './assets/components/ChartTest/ChartTest';
import Dropdown from './assets/components/Dropdown/Dropdown';
import HotelSelector from './assets/components/HotelSelector/HotelSelector';
import Sidebar from './assets/components/Sidebar/Sidebar';
import SignIn from './assets/components/SignIn/SignIn';
import ChartWithDropdown from './assets/components/ChartTest/ChartTestZwei';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const dropdownOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" }
  ];

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Sidebar />}
        <div className="main-content">
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<ChartTest />} />
                <Route path="/chartwithdropdown" element={<ChartWithDropdown />} />
                <Route path="/dropdown" element={<Dropdown initialValue="blue" label='test' options={dropdownOptions} onChange={(selectedValue) => console.log("Selected value:", selectedValue)} />} />
                <Route path="/hotelselector" element={<HotelSelector />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;