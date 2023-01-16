import React from "react";
import "./detail.css";
import { useState } from "react";
import { useEffect } from "react";

const DetailForm = (props) => {
  const [arrSelect, setArrSelect] = useState({
    genre: "all",
    mediaType: "all",
    language: "all",
    year: "",
  });

  useEffect(() => {
    props.handle(arrSelect);
  }, []); // mới vô sẽ truyền giá trị mặc định rỗng trước

  const selectHandle = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.id);
    const [id, value] = [e.target.id, e.target.value];
    let prev = arrSelect;
    prev[id] = value; // đây là cách để cập nhật object của useState cho cả <select> và <input>

    setArrSelect(prev);
    //console.log(arrSelect);
    props.handle(arrSelect); // tự động truyền mỗi khi có cập nhật thay đổi
  };
  return (
    <div className="frame">
      <form>
        <div className="item">
          <label htmlFor="cars">Choose genre :</label>
          <select name="genre" id="genre" onChange={selectHandle}>
            {/* <option value="">--Genre--</option> */}
            <option value="all">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Documentary">Documentary</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="mediaType">Choose Media Type :</label>
          <select name="mediaType" id="mediaType" onChange={selectHandle}>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tV">TV</option>
            <option value="person">Person</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="language">Choose language :</label>
          <select name="language" id="language" onChange={selectHandle}>
            <option value="all">All</option>
            <option value="en">English</option>
            <option value="fr">France</option>
            <option value="ja">Japan</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="year">Year : </label>
          <input type="text" id="year" name="year" onChange={selectHandle} />
        </div>
      </form>
    </div>
  );
};

export default DetailForm;
