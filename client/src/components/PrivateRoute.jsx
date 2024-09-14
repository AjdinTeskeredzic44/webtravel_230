// src/components/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../contexts/Context';

const PrivateRoute = () => {
    const { user } = useContext(Context);

    if(user.loading) return null;

    return user.exists ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
