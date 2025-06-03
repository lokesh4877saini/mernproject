import React from 'react'
import './Slider.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { AddCircle } from '@mui/icons-material';

const Slider = () => {
    return (
        <div className='DashboardSlider'>
            <div className="stickySidebar">
            <div>
                <Link to='/'>
                    <img src={Logo} alt={"logo"} />
                </Link>
            </div>
            <div>
                <Link to='/admin/dashboard'>
                    <DashboardIcon />
                </Link>
            </div>
            <div>
                <Link to="/admin/new/product">
                    <AddCircle /> <p>Create Product</p>
                </Link>

            </div>
            <div>
                <Link to='/admin/products'>
                    <PostAddIcon /> <p> All Products</p>
                </Link>
            </div>
            {/* <div>
                <Link to="/admin/orders" >
                    <ListAltIcon /><p>Orders</p>
                </Link>

            </div>
            <div>
                <Link to="/admin/users" >
                    <GroupAddIcon /> <p> Users</p>
                </Link>
            </div>
            <div>
                <Link to="/admin/reviews" >
                    <RateReviewIcon /><p> Reviews</p>
                </Link>
            </div> */}
            </div>
        </div>
    )
}

export default Slider