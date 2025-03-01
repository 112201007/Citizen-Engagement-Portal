import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CitizenView from './components/CitizenView';
import AdminView from './components/AdminView';
import WorkerView from './components/WorkerView';
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
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Login setUser={setUser} />} />

            <Route path="/citizen" element={<CitizenView />} />
            <Route path="/admin" element={<AdminView />} />
            
            {/* <Route path="/worker" element={<WorkerView />} /> */}
            <Route path="/worker/:workerId" element={<WorkerView />} />

            <Route path="/statistics" element={<IssueStatistics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;