import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import LogIn from "./pages/resgister/logIn";
import SignIn from "./pages/resgister/signIn";

function App() {
  const [log, setLog] = useState({ status: false, userMail: "" });

  useEffect(() => {
    // gửi request GET để tìm xem có user nào đã đăng nhập mà chưa thoát ra ko? nếu có thì login luôn cho họ
    fetch("http://localhost:5000/init")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setLog({ status: data.isLogIn, userMail: data.email });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInf = (inf) => {
    //console.log("day la app", inf);
    setLog({ status: inf.isLogIn, userMail: inf.message });
  };
  return (
    <BrowserRouter>
      <Navbar userName={log} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />

        <Route path="/login" element={<LogIn getInf={handleInf} />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
