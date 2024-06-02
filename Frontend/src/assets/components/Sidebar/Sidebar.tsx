import "./Sidebar.scss"

const Siedebar: React.FC = () => {
    return(
        <div className="sidebar">
            <h1>Willkommen account.name</h1>
            <ul>
                <li>Dashboard</li>
                <li>Tabels</li>
                <li>Graphs</li>
             </ul>
             <h2>Support</h2>
             <ul>
                <li>Faq</li>
                <li>make an appointment</li>
                <li>Settings</li>
             </ul>
             <div className="profile">
                <h3>name</h3>
                <p>hotel</p>
                <img src="" alt="Logo" />
             </div>
             <button>Logout</button>
        </div>
    )}
    export default Siedebar;