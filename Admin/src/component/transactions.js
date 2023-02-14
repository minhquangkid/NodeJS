import React from "react";
import "./dash.css";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dash")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setList(result.data);
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
      <div className="middle">
        <h3>Transactions List</h3>
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

export default Transactions;
