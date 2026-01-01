import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
            const { isLogin, user } = useSelector(state => state.auth);
            console.log(isLogin, user)

            if (!isLogin && !user) {
                        toast.error("You must be logged in to continue.")
                        return <Navigate to={"/login"} replace />
            }
            return children
}

export default ProtectedRoutes      