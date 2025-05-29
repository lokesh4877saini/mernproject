import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css';
import { Home, About, Contact } from './component/Home/index';
import { Account, EditProfile, ForgotPassword, LoginSignUp, ResetPassword, UpdatePassword, UserOptions } from './component/User/index';
import { Header, Footer } from './component/layout/index';
import ProtectedRoute from './component/Route/ProtectedRoute';
import { Cart, ProductDetails, Products, Search, Shipping, Confirm,StripeComponent,OrderSuccess,MyOrder,OrderDetails} from './component/Product/index';
import store from './store/store';
import { loadUser } from './store/actions/userActions';
function App() {
    useEffect(() => {
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
        <Route path='/login' Component={LoginSignUp} />
        <Route path='/password/update' element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path='/password/forgot' element={<ProtectedRoute element={ForgotPassword} />} />
        <Route path='/password/reset/:token' element={<ProtectedRoute element={ResetPassword} />} />
        <Route path='/shipping' element={<ProtectedRoute element={Shipping} />} />
        <Route path='/order/confirm' element={<ProtectedRoute element={Confirm} />} />
        <Route path='/order/payment' element={<ProtectedRoute element={StripeComponent} />} />
        <Route path='/order/success' element={<ProtectedRoute element={OrderSuccess} />} />
        <Route path='/orders/me' element={<ProtectedRoute element={MyOrder} />} />
        <Route path='/order/:id' element={<ProtectedRoute element={OrderDetails} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
