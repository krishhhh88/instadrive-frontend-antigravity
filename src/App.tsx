import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Drive from './pages/Drive';
import Scheduler from './pages/Scheduler';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="drive" element={<Drive />} />
                    <Route path="schedule" element={<Scheduler />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
