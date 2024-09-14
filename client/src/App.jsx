
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import TripDetails from './pages/TripDetails';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import ContextProvider from './contexts/Context';

const App = () => {
    return (
        <ContextProvider>
            <Router>
                <NavBar />
                <div className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="trips/:id" element={<TripDetails />} />
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="admin" element={<AdminDashboard />} />
                            <Route path="user" element={<UserDashboard />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </ContextProvider>
    );
};

export default App;
