import React from "react";
import classes from "./logIn.module.css";
import { useRef, useState } from "react";

const SignIn = () => {
  const [err, setErr] = useState("");
  const mail = useRef();
  const pass = useRef();

  const subHandle = () => {
    if (!mail.current.value) {
      setErr("Vui lòng điền gmail");
    } else if (!pass.current.value) {
      setErr("Vui lòng điền password");
    } else {
      fetch(`http://localhost:5000/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          getMail: mail.current.value,
          getPass: pass.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data); // xuất ra respond của BE (có thể là kết quả hoặc thông báo lỗi 400)
          if (data.redirect) {
            // nếu thành công sẽ chuyển hướng trang
            window.location.replace(data.message);
          } else {
            setErr(data.message);
          }
        });
    }
  };

  return (
    <div className={classes.frame}>
      <h1>Sign Up</h1>
      <input type="text" name="mailSign" placeholder="Your Email" ref={mail} />
      <input
        type="password"
        name="passSign"
        placeholder="Password"
        ref={pass}
      />
      <button onClick={subHandle}>Create Account</button>
      <p>{err}</p>
    </div>
  );
};

export default SignIn;
