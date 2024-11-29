import React from 'react';
import Column from './Column/Column';
import priorityMap from './Helper/PriorityMap';
import statusMap from './Helper/StatusMap';

export default function DashBoard({ tickets, groupBY, sortBy, users }) {

  const groupTickets = (tickets) => {
    if (groupBY === 'status') {
      const statusGroups = Object.keys(statusMap).reduce((acc, statusKey) => {
        acc[statusMap[statusKey]?.label || 'Unknown Status'] = [];
        return acc;
      }, {});
      tickets.forEach(ticket => {
        const statusLabel = statusMap[ticket.status]?.label || 'Unknown Status';
        if (statusGroups[statusLabel]) {
          statusGroups[statusLabel].push(ticket);
        }
      });

      return statusGroups;
    } else if (groupBY === 'assignee') {
      return tickets.reduce((acc, ticket) => {
        const user = users.find((user) => user.id === ticket.userId);  
        const userName = user ? user.name : 'Unknown'; 
        if (!acc[userName]) acc[userName] = [];
        acc[userName].push(ticket);
        return acc;
      }, {});
    } else if (groupBY === 'priority') {
      const priorityGroups = Object.keys(priorityMap).reduce((acc, priorityKey) => {
        acc[priorityMap[priorityKey]?.label || 'Unknown Priority'] = [];
        return acc;
      }, {});
      tickets.forEach(ticket => {
        const priorityLabel = priorityMap[ticket.priority]?.label || 'Unknown Priority';
        if (priorityGroups[priorityLabel]) {
          priorityGroups[priorityLabel].push(ticket);
        }
      });

      return priorityGroups;
    }
    return {};  
  };

  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority); 
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title)); 
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <Column 
          key={group} 
          group={group} 
          groupBY={groupBY} 
          tickets={sortTickets(tickets)} 
          users={users} 
        />
      ))}
    </div>
  );
}
