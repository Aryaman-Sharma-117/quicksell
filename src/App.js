import './App.css';
import { useEffect, useState } from 'react';
import DashBoard from './DashBoard';
import fetchData from './Helper/Data';

function App() {
  const [groupBY, setGroupBy] = useState(localStorage.getItem('groupBy') || "status");
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || "title");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [displayOptions, setDisplayOptions] = useState(false);

  useEffect(() => {
    fetchData().then(data => {
      setTickets(data.tickets);
      setUsers(data.users);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBY);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBY, sortBy]);

  const toggleDisplayOptions = () => {
    setDisplayOptions(!displayOptions);
  };

  return (
    <div className="App">
      <h1>DashBoard</h1>
      <div className="display-options-container">

      <button className="display-options-button" onClick={toggleDisplayOptions}>
        <img
          src="/icons/Display.svg"
          alt="Display Options"
          className="display-options-icon"
        />
        Display Options
      </button>

      {displayOptions && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label className="dropdown-label">Group By</label>
            <select
              value={groupBY}
              onChange={(e) => setGroupBy(e.target.value)}
              className="dropdown-select"
            >
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="assignee">User</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label className="dropdown-label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="dropdown-select"
            >
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
        )}
      </div>
      <DashBoard tickets={tickets} groupBY={groupBY} sortBy={sortBy} users={users} />
    </div>
  );
}

export default App;
