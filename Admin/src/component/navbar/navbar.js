import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const logoutHandle = () => {
    console.log(props.inf.message);
    fetch("http://localhost:5000/admin/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: props.inf.message }),
    })
      .then()
      .catch();
    props.getBack();
  };
  return (
    <div className="frame">
      <h2>Admin Page</h2>
      <label>Main</label>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
      </ul>
      <label>USTS</label>
      <ul>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link to="/hotels">hotels</Link>
        </li>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
      <label>NEW</label>
      <ul>
        <li>
          <Link to="/newHotel">New Hotel</Link>
        </li>
        <li>
          <Link to="/newRoom">New Room</Link>
        </li>
      </ul>
      <label>USER</label>
      <ul>
        <li>
          <Link to="" onClick={logoutHandle}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
