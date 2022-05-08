import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import Header from './components/Header';
import RegisterScreen from './pages/RegisterScreen'
import PrivateComponent from './components/PrivateComponent';
import PostScreen from './pages/PostScreen'
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' exact={true} element={<HomeScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />

          <Route element={<PrivateComponent />}>
            <Route path='/post' element={<PostScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
