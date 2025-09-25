import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard';
import Nurses from './pages/nurses';
import LandingPage from './pages/landing';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Labs from './pages/labs';
import Members from './pages/members';
import ViewMember from './pages/members/viewMember';
import Allocation from './pages/allocations';
import ViewNurse from './pages/nurses/viewNurse';
import AddNurse from './pages/nurses/addNurse';
import EditNurse from './pages/nurses/EditNurse';
import Bookings from './pages/bookings';
import { View } from 'lucide-react';
import ViewLab from './pages/labs/viewLab';

function App() {
  return (
    <Router>
      <Routes>
      {/* Dashboard routes will come here */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/nurses" element={<Nurses />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/labs/:id" element={<ViewLab />} />
          <Route path="/members" element={<Members />} />
          <Route path="/nurses/add" element={<AddNurse />} />
          <Route path="/nurses/edit/:id" element={<EditNurse />} />
          <Route path="/allocations" element={<Allocation />} />
          <Route path="/members/:id" element={<ViewMember />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/nurses/view/:id" element={<ViewNurse />} />

          
        </Route>

        {/* These routes do not use the dashboard layout */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer position='top-right' autoClose={3000} />
    </Router>
    
  );
}

export default App;
