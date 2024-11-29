import React from 'react';
import Card from '../Card/Card';
import priorityMap from '../Helper/PriorityMap';
import statusMap from '../Helper/StatusMap';
import './Column.css';

export default function Column({ tickets, groupBY, group, users }) {
  const isPriorityGrouping = groupBY === 'priority';
  const isStatusGrouping = groupBY === 'status';

  let label = '';
  let image = '';
  if (isPriorityGrouping) {
    const priorityInfo = priorityMap[group];
    label = priorityInfo ? priorityInfo.label : 'Unknown Priority';
    image = priorityInfo ? priorityInfo.image : '';
  } else if (isStatusGrouping) {
    const statusInfo = statusMap[group];
    label = statusInfo ? statusInfo.label : 'Unknown Status';
    image = statusInfo ? statusInfo.img : '';
  } else{
    label = group;
  }

  return (
    <div className="ticket-column">
      <div className="column-header">
        <img
          src={image}
          alt={label}
          className="column-icon"
        />
        <h2 className="column-label">{label}</h2>
      </div>
      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Card key={ticket.id} ticket={ticket} users={users} />
          ))
        ) : (
          <p className="no-tickets">No tickets available</p>
        )}
      </div>
    </div>
  );
}
