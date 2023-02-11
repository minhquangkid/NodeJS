import React, { useEffect, useState } from "react";
import "./transaction.css";

const Transaction = ({ userName }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/transaction")
      .then((res) => res.json())
      .then((result) => console.log(result))
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
    <div className="tbl">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>#</th>
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
                <td>{index + 1}</td>
                <td>{item.hotel.name}</td>
                <td>{run(item.room)}</td>
                <td>
                  {new Date(item.dateStart).toLocaleDateString()} -{" "}
                  {new Date(item.dateEnd).toLocaleDateString()}
                </td>
                <td>{item.price}</td>
                <td>{item.payment}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
