import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Spinners from './components/Spinners';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage'
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';

const App = () => {
  const { loading } = useSelector(state => state.alert);
  
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinners />
        ) : (
          <Routes>
            <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/apply-doctor' element={<ProtectedRoute>< ApplyDoctor/></ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute>< Users/></ProtectedRoute>} />
            <Route path='/admin/doctors' element={<ProtectedRoute>< Doctors/></ProtectedRoute>} />
            <Route path='/notification' element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            {/* Fixed typo in the path '/register' */}
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
