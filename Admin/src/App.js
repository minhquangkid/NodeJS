import "./App.css";
import Dashboard from "./component/dash";
import HotelList from "./component/hotelList";
import NewHotel from "./component/newHotel";
import RoomList from "./component/roomList";
import Navbar from "./component/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRoom from "./component/newRoom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/newHotel" element={<NewHotel />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/newRoom" element={<NewRoom />} />
            {/* <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel userName={log.user} />} />

        <Route path="/login" element={<LogIn getInf={handleInf} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/transaction"
          element={<Transaction userName={log.user} />}
        /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
