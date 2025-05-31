import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import Slider from './Slider.jsx';
import { toast } from 'react-hot-toast'
import Loader from '../../layout/loader/Loader';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProductsForAdmin} from '../../../store/actions/productActions';
import './dashboard.scss';
const Dashboad = () => {
  const dispatch = useDispatch();
  const { product: products, loading } = useSelector((state) => state.products);
  useEffect(() => {

    dispatch(getAllProductsForAdmin());
  }, [dispatch, toast])
  let outofStock = 0;
  products && products.forEach((item)=>{
    if(item.stock == 0){
      outofStock+=1;
    }
  })
  const lineState = {
    labels: [
      "Intial Amount", "Amount Earned"
    ],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["rgba(0, 255, 0, 0.8)", "rgb(0, 225, 255)"],
        hoverBackgroundColor: ["rgba(0, 200, 0, 0.1)", "rgb(0, 180, 255)"],
        data: [0, 40000],
      },
    ],
  }
  const DoughnuteState = {
    labels: [
      "Out of Stock", "In Stock"
    ],
    datasets: [
      {
        label: "Stock",
        backgroundColor: ["rgba(0, 255, 0, 0.8)", "rgb(0, 225, 255)"],
        hoverBackgroundColor: ["rgba(0, 200, 0, 0.1)", "rgb(0, 180, 255)"],
        data: [2, 20],
      },
    ],
  }
  return (
    <>
      {loading ? (<Loader />)
        :
        (<>
          <div className='Dashboard'>
            <Slider />
            <div className="mainContainer">
              <h2>Dashboard</h2>
              <div className="dashboardSummaryBox1">
                <div>
                  <p>
                    Total Ammount :
                  </p>
                  <span>
                    200000000
                  </span>
                </div>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to='/Admin/products'>
                  <p>Product</p>
                  <p>{products && products.length}</p>
                </Link>
                <Link to="/Admin/orders" >
                  <p>Order</p>
                  <p>50</p>
                </Link>
                <Link to="/Admin/users" >
                  <p>User</p>
                  <p>50</p>
                </Link>
              </div>
              <div className="lineChart">
                <Line data={lineState} />
              </div>
              <div className="lineChart">
                <Doughnut data={DoughnuteState} />
              </div>
            </div>
          </div>
        </>)}
    </>
  )
}

export default Dashboad;