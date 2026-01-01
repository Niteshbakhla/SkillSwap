import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, Suspense, lazy } from 'react';
import { loadUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';
import { Loader2 } from 'lucide-react';

// Lazy imports (pages load only when visited)
const LandingPage = lazy(() => import('./pages/Landing'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const OfferSubmissionPage = lazy(() => import('./pages/Offer'));
const OffersList = lazy(() => import('./pages/Browse'));
const Profile = lazy(() => import('./pages/Profile'));
const Request = lazy(() => import('./pages/Request'));
const Chat = lazy(() => import('./pages/Chat'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />


      <Suspense fallback={<div className='flex justify-center items-center h-[80vh]'><Loader2 className='animate-spin' /></div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-offer" element={<OfferSubmissionPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/browse" element={<OffersList />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/request" element={<Request />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
