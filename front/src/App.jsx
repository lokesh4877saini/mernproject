import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css';
import { Home, About, Contact } from './component/Home/index';
import { Account, EditProfile, ForgotPassword, LoginSignUp, ResetPassword, UpdatePassword, UserOptions } from './component/User/index';
import { Header, Footer } from './component/layout/index';
import ProtectedRoute from './component/Route/ProjectedRoute';
import { Cart, ProductDetails, Products, Search,Shipping } from './component/Product/index';
import store from './store/store';
import { loadUser } from './store/actions/userActions';
function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated, user } = useSelector(state => state.user);
  return (
    <Router basename="/mernproject/">
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' Component={Products} />
        <Route path='/products/:keyword' Component={Products} />
        <Route path='/search' Component={Search} />
        <Route path='/about' Component={About} />
        <Route path='/contact' Component={Contact} />
        <Route path='/orders' Component={Cart} />
        <Route path='/me/update' element={<ProtectedRoute element={EditProfile} />} />
        <Route path='/account' element={<ProtectedRoute element={Account} />} />
        <Route path='/login' Component={LoginSignUp}/>
        <Route path='/password/update' element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path='/password/forgot' element={<ProtectedRoute element={ForgotPassword} />} />
        <Route path='/password/reset/:token' element={<ProtectedRoute element={ResetPassword} />} />
        <Route path='/shipping' element={<ProtectedRoute element={Shipping} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
