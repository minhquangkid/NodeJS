import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="frame">
      <h2>Admin Page</h2>
      <label>Main</label>
      <ul>
        <li>
          <a href="http://localhost:3001">Dashboard</a>
        </li>
      </ul>
      <label>USTS</label>
      <ul>
        <li>
          <a href="http://localhost:3001/users">Users</a>
        </li>
        <li>
          <a href="http://localhost:3001/hotels">hotels</a>
        </li>
        <li>
          <a href="http://localhost:3001/rooms">Rooms</a>
        </li>
        <li>
          <a href="http://localhost:3001/rransactions">Transactions</a>
        </li>
      </ul>
      <label>NEW</label>
      <ul>
        <li>
          <a href="http://localhost:3001/newHotel">New Hotel</a>
        </li>
        <li>
          <a href="http://localhost:3001/newRoom">New Room</a>
        </li>
      </ul>
      <label>USER</label>
      <ul>
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
