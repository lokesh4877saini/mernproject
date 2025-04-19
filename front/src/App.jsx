import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './App.css';
import {Home,About,Contact} from './component/Home/index';
import {Account,EditProfile,ForgotPassword,LoginSignUp,ResetPassword,UpdatePassword,UserOptions} from './component/User/index';
import {Header,Footer} from './component/layout/index';
import {Cart,ProductDetails,Products,Search} from './component/Product/index';
import store from './store/store';
import { loadUser } from './store/actions/userActions';
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
        <Route path="/password/forgot" element = {<ForgotPassword/>} />
        <Route path="/password/reset/:token" element = {<ResetPassword/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
