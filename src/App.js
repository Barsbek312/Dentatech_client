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
import Branches from "./components/Branches/Branches";
import ServiceDisease from "./components/ServiceDisease/ServiceDisease";
import PatientCard from "./components/PatientCard/PatientCard";
import Notification from "./components/Common/Notification/Notification";
import CompletedProcedure from "./components/PatientCard/CompletedProcedure/CompletedProcedure";
import PatientBill from "./components/PatientCard/PatientBill/PatientBill";

function App() {

  const dispatch = useDispatch();
  const { loadingUser } = useSelector(state => state.user);
  const { loadingPatient } = useSelector(state => state.patient);
  const { loadingSchedule } = useSelector(state => state.schedule);
  const { loadingBranch } = useSelector(state => state.branch);
  const { loadingTooth } = useSelector(state => state.tooth);
  const { loadingDisease } = useSelector(state => state.disease)
  const { loadingProcedure } = useSelector(state => state.procedure);
  const { loadingPersonal } = useSelector(state => state.personal);
  const { loadingBill } = useSelector(state => state.bill);
  const { loadingTemplate } = useSelector(state => state.template);
  const { isShowNotification, isErrorNotification, notificationText } = useSelector(state => state.notification);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await dispatch(getUser());
    };

    fetchUser();
  }, [])

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Loader loading={loadingUser || loadingPatient || loadingSchedule || loadingBranch || loadingTooth || loadingDisease || loadingProcedure || loadingPersonal || loadingBill || loadingTemplate} />
        <Notification isShow={isShowNotification} Text={notificationText} isError={isErrorNotification} />
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Schedule />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/verify-email-notification" element={<VerifyNotification />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/services-diseases" element={<ServiceDisease />} />
          <Route path="/patient-card/:id/:activeIndex?" element={<PatientCard />} />
          <Route path="/patient-order/:id/:receptionId" element={<CompletedProcedure />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
