import React from "react";
import classes from "./newHotel.module.css";
import { useRef, useState } from "react";

const NewHotel = () => {
  const [err, setErr] = useState(null);
  const [multiSelect, setMultiSelect] = useState(null);

  const name = useRef();
  const city = useRef();
  const dis = useRef();
  const des = useRef();
  const imag = useRef();
  const type = useRef();
  const address = useRef();
  const title = useRef();
  const price = useRef();
  const featured = useRef();
  const rooms = useRef();

  const submitHandle = () => {
    if (!name.current.value) {
      setErr("Name is empty");
      return;
    }
    if (!city.current.value) {
      setErr("City is empty");
      return;
    }
    if (!dis.current.value) {
      setErr("Distance is empty");
      return;
    }
    if (!des.current.value) {
      setErr("Description is empty");
      return;
    }
    if (!imag.current.value) {
      setErr("image is empty");
      return;
    }
    if (!type.current.value) {
      setErr("Type is empty");
      return;
    }
    if (!address.current.value) {
      setErr("Address is empty");
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
    if (!multiSelect) {
      setErr("Select rooms !");
      return;
    }
    ////
    setErr("");
    ///
    const final = {
      name: name.current.value,
      city: city.current.value,
      dis: dis.current.value,
      des: des.current.value,
      imag: imag.current.value,
      type: type.current.value,
      address: address.current.value,
      title: title.current.value,
      price: price.current.value,
      featured: featured.current.value === "Yes" ? true : false,
      rooms: multiSelect,
    };
    console.log(final);

    fetch("http://localhost:5000/admin/postHotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ final }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.href = "http://localhost:3001/hotels";
      })
      .catch((err) => console.log(err));
  };
  const multi = (e) => {
    // cách để lấy multi select
    let array = [];
    for (let item of e.target.options) {
      if (item.selected) {
        array.push(item.value);
      }
    }
    console.log(array);
    setMultiSelect(array);
  };

  return (
    <div className={classes.frame}>
      <h1 className={classes.title}>Add New Product</h1>
      <div className={classes.content}>
        <div className={classes.column}>
          <label>Name</label>
          <input type="text" placeholder="My Hotel" ref={name} />
          <label>City</label>
          <input type="text" placeholder="HCM" ref={city} />
          <label>Distance</label>
          <input type="number" placeholder="500" ref={dis} />
          <label>Description</label>
          <input type="text" placeholder="description" ref={des} />
          <label>Image</label>
          <input type="text" ref={imag} />
        </div>

        <div className={classes.column}>
          <label>Type</label>
          <input type="text" placeholder="Hotel" ref={type} />
          <label>Address</label>
          <input type="text" placeholder="hcm, Q1" ref={address} />
          <label>Title</label>
          <input type="text" placeholder="the best hotel" ref={title} />
          <label>Price</label>
          <input type="number" placeholder="200" ref={price} />
          <label>Featured</label>
          <select ref={featured}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>
      <div className={classes.bot}>
        <label htmlFor="rooms">Rooms</label>
        <select name="rooms" id="rooms" ref={rooms} multiple onChange={multi}>
          <option value="1 Bed Room">1 Bed Room</option>
          <option value="2 Bed Room">2 Bed Room</option>
          <option value="Basement Double Room">Basement Double Room</option>
          <option value="Superior basement room">Superior basement room</option>
          <option value="Deluxe Room">Deluxe Room</option>
          <option value="Deluxe Window">Deluxe Window</option>
          <option value="Premier City View Room">Premier City View Room</option>
          <option value="Budget Double Room">Budget Double Room</option>
          <option value="Budget Twin Room">Budget Twin Room</option>
        </select>
      </div>

      <p style={{ color: "red" }}>{err}</p>

      <button onClick={submitHandle}>Send</button>
    </div>
  );
};

export default NewHotel;
