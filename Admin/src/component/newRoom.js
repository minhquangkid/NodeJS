import React from "react";
import classes from "./newHotel.module.css";
import { useRef, useState } from "react";

const NewRoom = () => {
  const [err, setErr] = useState(null);
  const [multiSelect, setMultiSelect] = useState(null);

  const des = useRef();
  const maxPeople = useRef();
  const title = useRef();
  const price = useRef();
  const hotel = useRef();
  const rooms = useRef();

  const submitHandle = () => {
    if (!des.current.value) {
      setErr("Description is empty");
      return;
    }

    if (!title.current.value) {
      setErr("Title is empty");
      return;
    }
    if (!price.current.value) {
      setErr("Price is empty");
      return;
    }
    if (!maxPeople.current.value) {
      setErr("maxPeople is empty");
      return;
    }
    if (!hotel.current.value) {
      setErr("Select hotel !");
      return;
    }
    if (!multiSelect) {
      setErr("Select room !");
      return;
    }
    //
    setErr("");
    ///
    const final = {
      des: des.current.value,
      title: title.current.value,
      price: price.current.value,
      hotel: hotel.current.value,
      maxPeople: maxPeople.current.value,
      rooms: multiSelect,
    };
    // console.log(final);

    fetch("http://localhost:5000/admin/postRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ final }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "http://localhost:3001/rooms";
      })
      .catch((err) => console.log(err));
  };
  const multi = () => {
    const array = rooms.current.value.split(".");
    // console.log(array);
    setMultiSelect(array);
  };

  return (
    <div className={classes.frame}>
      <h1 className={classes.title}>Add New Room</h1>
      <div className={classes.content}>
        <div className={classes.column}>
          <label>Title</label>
          <input type="text" placeholder="2 bed room" ref={title} />
          <label>Price</label>
          <input type="text" placeholder="100" ref={price} />
          <label>Rooms</label>
          <input
            type="text"
            placeholder="give comma between room numbers"
            onChange={multi}
            ref={rooms}
          />
        </div>

        <div className={classes.column}>
          <label>Description</label>
          <input type="text" placeholder="1 bathroom" ref={des} />
          <label>Max People</label>
          <input type="number" placeholder="2" ref={maxPeople} />

          <label>Choose a hotel</label>
          <select ref={hotel}>
            <option value="HANOI ROYAL PALACE HOTEL 2">
              HANOI ROYAL PALACE HOTEL 2
            </option>
            <option value="La Sinfonia del Rey Hotel and Spa">
              La Sinfonia del Rey Hotel and Spa
            </option>
            <option value="May De Ville Legend Hotel & Spa">
              May De Ville Legend Hotel & Spa
            </option>
            <option value="Alagon Saigon Hotel & Spa">
              Alagon Saigon Hotel & Spa
            </option>
          </select>
        </div>
      </div>

      <p style={{ color: "red" }}>{err}</p>
      <button onClick={submitHandle}>Send</button>
    </div>
  );
};

export default NewRoom;
