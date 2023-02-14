import "./App.css";
import { Fragment, useState } from "react";
import Dashboard from "./component/dash";
import HotelList from "./component/hotelList";
import NewHotel from "./component/newHotel";
import RoomList from "./component/roomList";
import Navbar from "./component/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRoom from "./component/newRoom";
import LogIn from "./component/logIn";
import Transactions from "./component/transactions";

function App() {
  const [show, setShow] = useState({ Admin: false });

  const getAdmin = (e) => {
    setShow(e);
  };

  const logout = () => {
    setShow({ Admin: false });
  };

  return (
    <BrowserRouter>
      <div className="App">
        {!show.Admin ? (
          <Routes>
            <Route path="/" element={<LogIn getInf={getAdmin} />} />
          </Routes>
        ) : (
          <Fragment>
            <div className="nav">
              <Navbar inf={show} getBack={logout} />
            </div>
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/hotels" element={<HotelList />} />
                <Route path="/newHotel" element={<NewHotel />} />
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/newRoom" element={<NewRoom />} />
                <Route path="/transactions" element={<Transactions />} />
              </Routes>
            </div>
          </Fragment>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
