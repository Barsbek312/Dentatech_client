import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { getUser } from "./redux/user";
import { useDispatch, useSelector } from "react-redux";
// import Loader from "./components/Common/Loader/Loader";
import Loader from "./components/Common/Loader/Loader";
import Notification from "./components/Common/Notification/Notification";
import LoginContainer from "./components/Authorization/LoginContainer/LoginContainer";
import AuthContainer from "./components/Authorization/SignupContainer/AuthContainer";
import VerifyContainer from "./components/Authorization/VerifyContainer/VerifyContainer";
import VerifyNotificationContainer from "./components/Authorization/VerifyNotificationContainer/VerifyNotificationContainer";
import BranchListContainer from "./components/BranchListContainer/BranchListContainer";
import HeaderContainer from "./components/HeaderContainer/HeaderContainer";
import PersonalContainer from "./components/PersonalContainer/PersonalContainer";
import ProfileContainer from "./components/ProfileContainer/ProfileContainer";
import ScheduleContainer from "./components/ScheduleContainer/ScheduleContainer";
import PatientListContainer from "./components/PatientListContainer/PatientListContainer";
import PatientCardContainer from "./components/PatientCardContainer/PatientCardContainer";
import CompletedProcedureContainer from "./components/PatientCardContainer/PatientCard/CompletedProcedureContainer/CompletedProcedureContainer";

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
        <HeaderContainer />
        <Routes>
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/" element={<ScheduleContainer />} />
          <Route path="/personal" element={<PersonalContainer />} />
          <Route path="/profile/:id" element={<ProfileContainer />} />
          <Route path="/patient-list" element={<PatientListContainer />} />
          <Route path="/verify-email" element={<VerifyContainer />} />
          <Route path="/verify-email-notification" element={<VerifyNotificationContainer />} />
          <Route path="/branch-list" element={<BranchListContainer />} />
          <Route path="/patient-card/:id/:activeIndex?" element={<PatientCardContainer />} />
          <Route path="/patient-order/:id/:receptionId" element={<CompletedProcedureContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
