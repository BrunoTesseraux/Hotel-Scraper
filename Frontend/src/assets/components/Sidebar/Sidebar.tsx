import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { useCompany } from '../../context/CompanyContext';

const Sidebar: React.FC = () => {
    const company = useCompany();

  return (
    <div className="sidebar">
      <div className="greeting">
        <h1>Hallo</h1>
        <h2>{company.username}</h2>
      </div>
      <div className="links">
        <Link to="/dashboard">
            <img src="./dashboard.png" alt="" />
            Dashboard
        </Link>
        <Link to="/tables">
            <img src="./table.png" alt="" />
            Tables
        </Link>
        <Link to="/charts">
            <img src="./line-chart.png" alt="" />
            Charts
        </Link>
      </div>
      <h2>Support</h2>
      <div className="links">
        <Link to="/faq">
            <img src="./question.png" alt="" />
            Faq
        </Link>
        <Link to="/appointment">
            <img src="./calendar.png" alt="" />
            Make an appointment
        </Link>
        <Link to="/settings">
            <img src="./settings.png" alt="" />
            Settings
        </Link>
      </div>
      <div className="profile">
        <h3>Scrapy Boys</h3>
        <img src="./scrapy.jpg" alt="Logo" />
        <p>founded 2024</p>
      </div>
      <button>
        <img src="./logout.svg" alt="" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;