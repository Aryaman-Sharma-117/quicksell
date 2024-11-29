import React from 'react';
import priorityMap from '../Helper/PriorityMap';
import statusMap from '../Helper/StatusMap';
import './Card.css';

export default function Card({ ticket, users }) {
  const { title, status, userId, priority } = ticket;
  const user = users.find((user) => user.id === userId);  
  const userName = user ? user.name : 'Unknown';  

  const priorityInfo = priorityMap[priority] || { label: 'Unknown Priority', image: '/icons/default_priority.png' };
  
  const statusInfo = statusMap[status] || { label: 'Unknown Status', img: '/icons/default_status.png' };

  return (
    <div className="ticket-card">
      <span className="ticket-id">Ticket ID: {ticket.id}</span>

      <h4 className="ticket-title">{title}</h4>

      <div className="ticket-info">
        <p className="ticket-user">
          Assigned to: <strong>{userName}</strong>
        </p>
        <p className="ticket-status">
          Status: <strong>{statusInfo.label}</strong>
        </p>
      </div>
      <button className="ticket-tag" 
              style={{backgroundColor: user.available? 'green' : 'red'}}
              title={user.available? 'User is available' : 'User is not available'}
          >{ticket.tag}</button>

      <div className="priority-section">
        <img
          src={priorityInfo.image}
          alt={priorityInfo.label}
          className="priority-icon"
        />
        <span className="priority-label">{priorityInfo.label}</span>
      </div>

      <div className="status-section">
        <img
          src={statusInfo.img}
          alt={statusInfo.label}
          className="status-icon"
        />
        <span className="status-label">{statusInfo.label}</span>
      </div>
    </div>
  );
}
