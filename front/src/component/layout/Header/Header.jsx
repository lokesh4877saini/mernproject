import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import store from '../../../store/store';
import { useSelector } from 'react-redux'
import { LogoutOutlined } from '@mui/icons-material';
import { logout } from '../../../store/actions/userActions';
import { loadUser } from '../../../store/actions/userActions';
import { MenuOutlined,CloseOutlined } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
const Header = () => {
  const dispatch = useDispatch();
  const menuToggler  = useRef();
  const [count, setCount] = useState(0)
  const { isAuthenticated } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const [icon, setIcon] = useState("menuIcon")
  const handleIcon = (e) => {
    setIcon((prev)=> {
      if(prev == "menuIcon"){
        menuToggler.current.classList.remove("none");
        return "crossIcon";
      }else{
        menuToggler.current.classList.add("none");
        return "menuIcon";
      }
    });
  }
  const changeBg = (e) => {
    if (e.target.classList[0] === 'menu') {
      e.target.classList.add('changeBg')
      setTimeout(() => {
        e.target.classList.remove('changeBg')
      }, 6000);
    }
  }
  useEffect(() => {
    store.dispatch(loadUser());
    if (cartItems.length > 0) {
      setCount(cartItems.length);
    } else {
      setCount(0);
    }
  }, [count, cartItems]);
  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  }
  return (
    <>
      <nav onClick={changeBg}>
        <div className="w900">
          <button onClick={handleIcon} className='Btnblock Btnnone'>
            {
            icon === "menuIcon" ? (<MenuOutlined style={{color:"white"}} className="menuIcon" />) : (<CloseOutlined style={{color:"white"}} className="crossIcon"/>)}</button>
          <div ref={menuToggler}
            className='MenuModel none'>
            <div className="Model_logo">
              Ecomm
            </div>
            <div className="Model_production">
              <ul>
                <Link to={'/'} >Home</Link>
                <Link to={'/products'} >Products</Link>
                <Link to={'/contact'} >Contact</Link>
                <Link to={'/about'} >About</Link>
              </ul>
            </div>
            <div className="Model_action">
              <ul><Link
                to={'/login'}
              >
                {isAuthenticated ? (<>
                  <LogoutOutlined style={{color:"tomato"}} onClick={logoutUser} />
                </>) : (<><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFF55"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg></>)}
              </Link>
                <Link
                  to={'/search'}
                ><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FBFD"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Link>
                <Link
                  to={'/cart'}
                >
                  <span>{count}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FB4C"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                </Link>
              </ul>
            </div>

          </div>
        </div>
        <div className="menu none">
          <div className="logo">
            Ecomm
          </div>
          <div className="production">
            <ul>
              <Link to={'/'} >Home</Link>
              <Link to={'/products'} >Products</Link>
              <Link to={'/contact'} >Contact</Link>
              <Link to={'/about'} >About</Link>
            </ul>
          </div>
          <div className="action">
            <ul>
              <Link
                to={isAuthenticated ? '' : '/login'}
              >
                {isAuthenticated ? (<>
                  <LogoutOutlined onClick={logoutUser} />
                </>) : (<><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFF55"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></svg></>)}
              </Link>
              <Link
                to={'/search'}
              ><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FBFD"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Link>
              <Link
                to={'/cart'}
              >
                <span>{count}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FB4C"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
              </Link></ul>
          </div>

        </div>
      </nav>
    </>
  )
}

export default Header