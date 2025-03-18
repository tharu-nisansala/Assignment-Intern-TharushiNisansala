import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './Pages/Registraion';
import LoginPage from './Pages/Login';
import Dashborad from './Pages/Dashborad';
import Students from './Pages/Students';
import EditStudent from './Pages/EditStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path='/Students' element={<Students/>}/>
        <Route path="/students/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
