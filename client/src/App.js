import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen'
import PrivateComponent from './components/PrivateComponent';
import PostScreen from './pages/PostScreen'
import InforUserScreen from './pages/InforUserScreen'
import EmailVerify from './components/EmailVerify'
import UpdateUserScreen from './pages/UpdateUserScreen';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import ChangePasswordScreen from './pages/ChangePasswordScreen'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<HomeScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/user/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/password-reset/:id/:token' element={<PasswordReset />} />

          <Route element={<PrivateComponent />}>
            <Route path='/post' element={<PostScreen />} />
            <Route path='/infor-user' element={<InforUserScreen />} />
            <Route path='/user-update' element={<UpdateUserScreen />} />
            <Route path='/change-password' element={<ChangePasswordScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
