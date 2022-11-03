import "./styles/styles.scss";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import SigninFormBussiness from './Pages/SigninFormBussiness';
import SigninFormStudent from './Pages/SigninFormStudent';
import Error404 from './Pages/Error404';
import StudentSpace from "./Pages/StudentSpace";
import BussinesSpace from "./Pages/BussinesSpace";
import StudentInfo from "./component/StudentInfo";
import { UserProvider } from "./context/UserContext";
import StudentEditInfo from "./component/StudentEditInfo";
import { StudentInfoProvider } from "./context/StudentInfoContext";
import BussinesInfo from "./component/BussinesInfo";
import { BussinesInfoProvider } from "./context/BussinesInfoContext";
import BussinesEditInfo from "./component/BussinesEditInfo";
import FormVacantes from "./component/FormVacantes";
import BussinesAvaible from "./component/BussinesAvaible";
import LoginAdmin from "./Pages/LoginAdmin";
import AdminInfo from "./component/AdminInfo";
import AdminSpace from "./Pages/AdminSpace";

function App() {
  return (
    <UserProvider>

      <StudentInfoProvider>
        <BussinesInfoProvider>
          <div className="App">
            <HashRouter>
              <Routes>
                <Route path="admin">
                  <Route path="login" element={<LoginAdmin />}></Route>
                  <Route path="main" element={<AdminSpace SpaceSection={AdminInfo} />} />
                </Route>
                <Route path="signinStudnent" element={<SigninFormStudent />} />
                <Route path="signinBusiness" element={<SigninFormBussiness />} />
                <Route path="spaceMain">

                  <Route path="studentSpace">
                    <Route path="main/:idUser" element={<StudentSpace SpaceSection={StudentInfo} />} />
                    <Route path="edit/:idUser" element={<StudentSpace SpaceSection={StudentEditInfo} />} />
                    <Route path="info/:idUser" element={<StudentSpace />} />
                    <Route path="bussiness/:idUser" element={<StudentSpace SpaceSection={BussinesAvaible} />} />
                    <Route path="bussines/:idUser/:NIT" element={<StudentSpace SpaceSection={BussinesInfo} />} />

                  </Route>

                  <Route path="bussinesSpace" >
                    <Route path="main/:NIT" element={<BussinesSpace SpaceSection={BussinesInfo} />} />
                    <Route path="edit/:NIT" element={<BussinesSpace SpaceSection={BussinesEditInfo} />} />
                    <Route path="createJob/:NIT" element={<BussinesSpace SpaceSection={FormVacantes} />} />
                  </Route>
                </Route>
                <Route path="/" element={<LoginForm />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </HashRouter>
          </div>
        </BussinesInfoProvider>
      </StudentInfoProvider>

    </UserProvider>

  );
}

export default App;
