import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Services from './components/services/Services';
import Contact from './components/contact/Contact';
import Home from './components/home/Home';
import SignIn from './components/sign-up/SignIn';
import SignUp from './components/sign-in/SignUp';
import { AuthContext } from './contexts/AuthContext';
import EditService from './components/edit-service/EditService';

import { singleServiceLoader } from './lib/loaders';
import { setNavigate } from './navigation';
import Footer from './components/footer/Footer';
import UserSettings from './components/user-settings/UserSettings';
import AddService from './components/add-service/AddService';

const NavigationSetup = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
    <div className='container'>
    <Router>
      <NavigationSetup />
      <Navbar />
      <div style={{ paddingTop: '4rem' }}>
        <Routes>
          {currentUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/add-service" element={<AddService />} />
              <Route path="/edit-service/:id" element={<EditService />} loader={singleServiceLoader} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user-settings" element={<UserSettings />} />
              <Route path="*" element={<Navigate to="/services" />} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/signin" />} />
            </>
          )}
        </Routes>
      </div>
   
    </Router>
    </div>
    <Footer />
    </>
  );
}

export default App;
