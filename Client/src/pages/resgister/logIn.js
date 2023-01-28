import React from "react";
import classes from "./logIn.module.css";
import { useRef, useState } from "react";

const LogIn = (props) => {
  const [err, setErr] = useState("");
  const mail = useRef();
  const pass = useRef();

  const subHandle = () => {
    if (!mail.current.value) {
      setErr("Vui lòng điền gmail");
    } else if (!pass.current.value) {
      setErr("Vui lòng điền password");
    } else {
      fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          getMail: mail.current.value,
          getPass: pass.current.value,
        }),
      })
        .then((res) => {
          //console.log("BE da nhan dc login", res);
          return res.json();
        })
        .then((data) => {
          if (data.isLogIn) {
            // nếu đăng nhập đúng
            //console.log(data);
            props.getInf(data);
            window.location.replace("http://localhost:3000");
          } else {
            setErr(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={classes.frame}>
      <h1>Login</h1>
      <input type="text" name="mailSign" placeholder="Your Email" ref={mail} />
      <input
        type="password"
        name="passSign"
        placeholder="Password"
        ref={pass}
      />
      <button onClick={subHandle}>Login</button>
      <p>{err}</p>
      <a href="http://localhost:3000/signin" target="_self">
        Sign In ?
      </a>
    </div>
  );
};

export default LogIn;