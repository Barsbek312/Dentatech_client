import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Auth from "./components/Authorization/Signup/Auth";
import Schedule from "./components/Schedule/Schedule";
import Personal from "./components/Personal/Personal";
import Login from "./components/Authorization/Login/Login";
import Profile from "./components/Profile/Profile";
import { useEffect } from "react";
import { checkAuth, getEvents, getUser } from "./redux/user";
import { useDispatch, useSelector } from "react-redux";
// import Loader from "./components/Common/Loader/Loader";
import Loader from "./components/Common/Loader/Loader";
import Patients from "./components/Patients/Patients";
import Verify from "./components/Authorization/Verify/Verify";
import VerifyNotification from "./components/Authorization/VerifyNotification/VerifyNotification";

function App() {

  const dispatch = useDispatch();
  const {loadingUser} = useSelector(state => state.user);
  const {loadingPatient} = useSelector(state => state.patient);
  const {loadingSchedule} = useSelector(state => state.schedule);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await dispatch(getUser());
    };

    fetchUser();
  }, [])

  

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Loader loading={loadingUser || loadingPatient || loadingSchedule} />
        <Header />
          <Routes>
            <Route path="/auth" element={<Auth />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Schedule />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/verify-email" element={<Verify />}/>
            <Route path="/verify-email-notification" element={<VerifyNotification />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
