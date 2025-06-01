import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CitizenView from './components/CitizenView';
import AdminView from './components/AdminView';
import WorkerView from './components/WorkerView';
import RegisterView from './components/RegisterView';

import IssueStatistics from './components/IssueStatistics';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
      
            <Route path="/" element={<Login setUser={setUser} />} />

            <Route path="/citizen/:citizenId" element={<CitizenView />} />
            <Route path="/admin/:adminId" element={<AdminView />} />
            
            {/* <Route path="/worker" element={<WorkerView />} /> */}
            <Route path="/worker/:workerId" element={<WorkerView />} />
            <Route path="/admin/:adminId" element={<AdminView />} />

            <Route path="/statistics" element={<IssueStatistics />} />
            <Route path="/register" element={<RegisterView />} /> {/* ✅ new line */}
            
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;