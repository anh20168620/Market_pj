import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from "socket.io-client";
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
import ProductDetail from './pages/ProductDetail'
import ProductByCategory from './pages/ProductByCategory';
import YourPostScreen from './pages/YourPostScreen'
import UpdatePostScreen from './pages/UpdatePostScreen'
import ProductSearchScreen from './pages/ProductSearchScreen'
import LikeProductScreen from './pages/LikeProductScreen'
import ChatScreen from './pages/ChatScreen';
import ChatDetailScreen from './pages/ChatDetailScreen'
import AdminScreen from './pages/AdminScreen';
import AdminDetailReport from './pages/AdminDetailReport';
import PrivateAdminComponent from './components/PrivateAdminComponent';
import UpdateCategory from './pages/UpdateCategory';
import AddNewCategory from './pages/AddNewCategory';

const socket = io('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] })

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact={true} element={<HomeScreen socket={socket} />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/user/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/password-reset/:id/:token' element={<PasswordReset />} />
          <Route path='/product-by-category/:categoryName/:categoryId' element={<ProductByCategory />} />
          <Route path='/product-search/:wordSearch' element={<ProductSearchScreen />} />



          <Route element={<PrivateComponent />}>
            <Route path='/post' element={<PostScreen />} />
            <Route path='/infor-user' element={<InforUserScreen />} />
            <Route path='/user-update' element={<UpdateUserScreen />} />
            <Route path='/change-password' element={<ChangePasswordScreen />} />
            <Route path='/your-post' element={<YourPostScreen />} />
            <Route path='/update-post/:productId' element={<UpdatePostScreen />} />
            <Route path='/product-detail/:productId' element={<ProductDetail socket={socket} />} />
            <Route path='/your-like-product' element={<LikeProductScreen />} />
            <Route path='/chat/' exact={true} element={<ChatScreen socket={socket} />} />
            <Route path='/chat/:ownId/:userId/:productId' element={<ChatDetailScreen socket={socket} />} />
          </Route>

          <Route element={<PrivateAdminComponent />} >
            <Route path='/admin' exact={true} element={<AdminScreen socket={socket} />} />
            <Route path='/admin/detail-report/:productId/:reportId/:userAvatar/:userName/:userId/:userNumberPhone' element={<AdminDetailReport socket={socket} />} />
            <Route path='/admin/update-category/:categoryId' element={<UpdateCategory />} />
            <Route path='/admin/Add-new-category' element={<AddNewCategory />} />
          </Route>

        </Routes>
      </Router>
    </div >
  );
}

export default App;
