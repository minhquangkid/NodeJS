import React from "react";
import "./hotelList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const render = () => {
    fetch("http://localhost:5000/admin/roomList")
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

  const deleteHandle = (e) => {
    console.log(e.target.id);
    fetch("http://localhost:5000/admin/roomList/deleteRoom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idRoom: e.target.id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.isOnTransaction) {
          alert("Room is on transaction !");
        } else {
          render();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="frameList">
      <h3>Rooms List</h3>
      <button className="add" onClick={() => navigate("/newRoom")}>
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
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Action</th>
            </tr>

            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>{item.price}</td>
                  <td>{item.maxPeople}</td>

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

export default RoomList;
