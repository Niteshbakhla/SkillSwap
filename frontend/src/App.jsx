import LandingPage from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect } from 'react';
import { loadUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import OfferSubmissionPage from './pages/Offer';
import OffersList from './pages/Browse';
import Profile from './pages/Profile';
import Request from './pages/Request';
import Chat from './pages/Chat';

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser())
  }, [])


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/my-offer' element={<OfferSubmissionPage />} />
        <Route path='/browse' element={<OffersList />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/request' element={<Request />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
      {/* <LandingPage /> */}
    </BrowserRouter>
  )
}

export default App;