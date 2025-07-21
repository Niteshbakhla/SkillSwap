import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
            const { isLogin, user } = useSelector(state => state.auth);

            if (!isLogin && !user) {
                        <Navigate to={"/login"} replace />
            }
            return children
}

export default ProtectedRoutes      