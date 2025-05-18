import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../store/actions/userActions';
import { Person, Dashboard, ExitToApp, ListAltRounded, AddShoppingCartRounded } from '@mui/icons-material';
import {Backdrop} from '@mui/material'
const UserOptions = ({ user }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const alert = useAlert();
    const [open, setOpen] = useState(true);
    const { cartItems } = useSelector((state) => state.cart);
    const options = [
        { icon: <ListAltRounded />, name: "Orders", func: orders },
        { icon: <Person />, name: "Profile", func: account },
        { icon: <AddShoppingCartRounded style={{color:(cartItems.length >=0 ?"unset":"tomato")}} />, name: `${cartItems.length}`, func: cart },
        { icon: <ExitToApp />, name: "LogOut", func: logoutUser },
    ]
    if (user.role === "admin") {
        options.unshift({
            icon: <Dashboard />,
            name: "Dashboard",
            func: dashboard,
        })
    }
    function dashboard() {
        history('/dashboard');

    }
    function orders() {
        history('/orders');
    }
    function cart() {
        history('/cart');
    }
    function account() {
        history('/account');

    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout successfully");
    }
    const speedDialStyle = {
        position: 'fixed',
        left: "94%",
        zIndex: "100",
        top: "14%"

    }
    return (<>
        <Backdrop 
        open={open} style={{zIndex:"1",visibility:open?"":"visible", background:open?"":"transparent",opacity:"1",position:open?"fixed":"relative"}}>
        <SpeedDial
            ariaLabel='SpeedDial tooltip'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            className="speedDial"
            style={speedDialStyle}
            direction='down'
            open={open}
            icon={<img className='speedDialIcon' style={{
                width: "100%",
                height: "100%",
                borderRadius: "100%",
                objectFit: "cover",
                
            }} src={user.avatar.url ? user.avatar.url : '/Profile.png'} alt="Profile" />}>
            {options.map((item, i) =>
            (
                <SpeedDialAction key={i} icon={item.icon} title={item.name} onClick={() => { item.func() }} />
            )
            )}
        </SpeedDial>
        </Backdrop>
    </>)
}
export default UserOptions;