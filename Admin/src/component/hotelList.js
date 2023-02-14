import React from "react";
import "./hotelList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const [list, setList] = useState([]);
  const negative = useNavigate();

  const render = () => {
    fetch("http://localhost:5000/admin/hotelList")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let array = result.data;

        setList(array);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    render();
  }, []);

  function deleteHandle(e) {
    console.log(e.target.id);
    fetch("http://localhost:5000/admin/hotelList/deleteHotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idHotel: e.target.id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.isOnTransaction) {
          alert("Hotel is on transaction !");
        } else {
          render(); // sau khi xóa xong thì tự render lại
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="frameList">
      <h3>Hotels List</h3>
      <button className="add" onClick={() => negative("/newHotel")}>
        Add New
      </button>
      <div>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Title</th>
              <th>City</th>
              <th>Action</th>
            </tr>

            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.city}</td>

                  <td>
                    <button id={item._id} onClick={deleteHandle}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelList;
