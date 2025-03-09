import React from 'react'
import './App.css'
import Header from './component/layout/Header/Header.jsx'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import {useSelector} from 'react-redux'
import Account from './component/User/Account';
import Contact from './component/Home/Contact';
import About from './component/Home/About';
import UserOptions from './component/User/UserOptions';
import store from './store/store';
import EditProfile from './component/User/EditProfile';
import Cart from './component/Product/Cart';
import { loadUser } from './store/actions/userActions';
import UpdatePassword from './component/User/UpdatePassword'
function App() {
  React.useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  const {isAuthenticated,user} = useSelector(state => state.user);
  return (
    <Router basename="/mernproject/">
      <Header />
        {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/product/:id' element={<ProductDetails/>} />
        <Route  path='/products' Component = {Products}/>
        <Route  path='/products/:keyword' Component = {Products}/>
        <Route  path='/search' Component = {Search} />
        <Route  path='/login' element = {isAuthenticated ? <Navigate to="/account"/> : <LoginSignUp/>}/>
        <Route  path='/account' element = {isAuthenticated ? <Account/>:<Navigate to="/login"/> }/>
        <Route path='/about' Component={About} />
        <Route path='/contact' Component={Contact} />
        <Route path='/orders' Component={Cart} />
        <Route path='/me/update'  element = {isAuthenticated ? <EditProfile/>:<Navigate to="/login"/>}/>
        <Route path="/password/update" element = {isAuthenticated ? <UpdatePassword/>:<Navigate to="/login"/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
