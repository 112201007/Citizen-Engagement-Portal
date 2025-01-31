// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CitizenView from './components/CitizenView';
import AdminView from './components/AdminView';
import WorkerView from './components/WorkerView';
import IssueStatistics from './components/IssueStatistics';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/citizen" element={<CitizenView />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/worker" element={<WorkerView />} />
            <Route path="/statistics" element={<IssueStatistics />} />
            <Route path="/" element={<h2 className="text-center my-5">Welcome to the Civic Management System</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;