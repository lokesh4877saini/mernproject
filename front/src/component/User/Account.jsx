import {Link,useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';
import { useEffect } from 'react';
import './Profile.scss';
const Account = () => {
    const {user,loading,isAuthenticated} = useSelector((state)=>state.user);
    const history  = useNavigate();
    useEffect(()=>{
        if(isAuthenticated === false){
            history('/login');  
        }
    },[isAuthenticated])
    return (
        <>
        {loading ? (<Loader/>):(<>
            <MetaData title={`${user.name}`} />
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link href="/me/update">Edit Profile</Link>
                </div>
                <div>
                    <div><h4>Full Name</h4>
                    <p>{user.name}</p></div>
                    <div><h4>Email</h4>
                    <p>{user.email}</p></div>
                    <div><h4>Joined On</h4>
                    <p>{String(user.createAt).substring(0,10)}</p></div>
                    <div className='order_updatepass'>
                        <button> <Link to='/orders'>My Orders</Link></button>
                    <button><Link to='/password/update'>Change Password</Link></button>  </div>
                </div>
            </div>
            </>)}
        </>
    )
}
export default Account;