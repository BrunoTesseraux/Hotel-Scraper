import './App.scss';
import SignIn from './assets/components/SignIn/SignIn';
import SignUp from './assets/components/SignIn/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <h1>Hotel Scraper</h1>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;