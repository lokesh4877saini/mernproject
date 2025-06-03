import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css';
import { Home, About, Contact } from './component/Home/index';
import { Account, EditProfile, ForgotPassword, LoginSignUp, ResetPassword, UpdatePassword, UserOptions } from './component/User/index';
import { Header, Footer } from './component/layout/index';
import ProtectedRoute from './component/Route/ProtectedRoute';
import { Cart, ProductDetails, Products, Search, Shipping, Confirm, StripeComponent, OrderSuccess, MyOrder, OrderDetails, Dashboard, ProductList, UserList, OrderList, NewProduct, UpdateProduct } from './component/Product/index';
import store from './store/store';
import { Toaster } from 'react-hot-toast'
import { loadUser } from './store/actions/userActions';
function App() {
  useEffect(() => {
    if (store.getState().user.isAuthenticated) {
      store.dispatch(loadUser());
    }
  }, []);
  const { isAuthenticated, user } = useSelector(state => state.user);
  return (
    <Router basename="/mernproject/">
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/me/update' element={<ProtectedRoute element={EditProfile} />} />
        <Route path='/account' element={<ProtectedRoute element={Account} />} />
        <Route path='/password/update' element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path='/password/reset/:token' element={<ProtectedRoute element={ResetPassword} />} />
        <Route path='/shipping' element={<ProtectedRoute element={Shipping} />} />
        <Route path='/order/confirm' element={<ProtectedRoute element={Confirm} />} />
        <Route path='/order/payment' element={<ProtectedRoute element={StripeComponent} />} />
        <Route path='/order/success' element={<ProtectedRoute element={OrderSuccess} />} />
        <Route path='/orders/me' element={<ProtectedRoute element={MyOrder} />} />
        <Route path='/order/:id' element={<ProtectedRoute element={OrderDetails} />} />
        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} element={Dashboard} />} />
        <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} element={ProductList} />} />
        <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} element={UserList} />} />
        <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} element={OrderList} />} />
        <Route path='/admin/new/product' element={<ProtectedRoute isAdmin={true} element={NewProduct} />} />
        <Route path='/admin/edit/product/:id' element={<ProtectedRoute isAdmin={true} element={UpdateProduct} />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App
