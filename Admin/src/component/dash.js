import React from "react";
import "./dash.css";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dash")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let array;
        if (result.data.length > 8) {
          array = result.data.slice(0, 8); // lấy ra 8 phần tử đầu tiên trong mảng
        } else {
          array = result.data;
        }
        setList(array);
      })
      .catch((err) => console.log(err));
  }, []);

  const run = (arr) => {
    let total = "";
    arr.forEach((item) => {
      total = total + "," + item.listNumber.join(",");
    });
    return total.substring(1); // xóa đi dấu "," dư ban đầu
  };

  return (
    <div>
      <div className="InfoBoard">
        <div className="board">
          <h5>Users</h5>
          <p>$100</p>
        </div>
        <div className="board">
          <h5>ORDERS</h5>
          <p>$100</p>
        </div>
        <div className="board">
          <h5>EARNINGS</h5>
          <p>$100</p>
        </div>
        <div className="board">
          <h5>BALANCE</h5>
          <p>$100</p>
        </div>
      </div>
      <div className="middle">
        <h3>Latest Transactions</h3>
        <div>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>

              {list.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{item._id}</td>
                    <td>{item.user}</td>
                    <td>{item.hotel.name}</td>
                    <td>{run(item.room)}</td>
                    <td>
                      {new Date(item.dateStart).toLocaleDateString()} -{" "}
                      {new Date(item.dateEnd).toLocaleDateString()}
                    </td>
                    <td>${item.price}</td>
                    <td>{item.payment}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
