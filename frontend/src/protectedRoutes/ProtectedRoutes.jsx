import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
            const { user, loading } = useSelector(state => state.auth);
            if (loading) return <Loader2 className='animate-spin' />;

            if (!user) {
                        toast.error("You must be logged in to continue.");
                        return <Navigate to="/login" replace />;
            }
            return <Outlet />;
}

export default ProtectedRoutes      