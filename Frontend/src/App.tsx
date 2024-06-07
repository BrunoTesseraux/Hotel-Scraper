import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChartTest from './assets/components/ChartTest/ChartTest';
import Dropdown from './assets/components/Dropdown/Dropdown';
import Sidebar from './assets/components/Sidebar/Sidebar';
import SignIn from './assets/components/SignIn/SignIn';
import ChartWithDropdown from './assets/components/ChartTest/ChartTestZwei';
import TagesTabelle from './assets/components/TagesTabelle/TagesTabelle';
import FAQ from './assets/components/FAQ/FAQ';
import Settings from './assets/components/Settings/Setting';
import { HotelProvider } from './assets/context/HotelPricescontext';

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
      <HotelProvider>
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
                <Route path="/charts" element={<ChartTest />} />
                <Route path="/tables" element={<TagesTabelle />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chartwithdropdown" element={<ChartWithDropdown />} />
                <Route path="/dropdown" element={<Dropdown initialValue="blue" label='test' options={dropdownOptions} onChange={(selectedValue) => console.log("Selected value:", selectedValue)} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
      </HotelProvider>
    </Router>
  );
}

export default App;