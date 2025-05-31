import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import Loader from '../../../layout/loader/Loader';
import MetaData from '../../../../component/layout/MetaData';
import {toast} from 'react-hot-toast'
import { Chip } from '@mui/material';
import {myOrder} from '../../../../store/actions/orderActions';
import {OpenInNewTwoTone} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import './myorder.scss';
const MyOrder = () => {
  const { orders, error, loading } = useSelector((state) => state.myorders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const rows=[];
  Array.isArray(orders) && orders.forEach(order => {
    rows.push(
      {id : order._id,
      status:order.orderStatus,
      quantity:order.orderItems.length,
      amount:order.totalPrice
      }
    )
  });
  const columns = [
    { field: 'id', headerName: 'Order Id',align: 'center', headerAlign: 'center', minWidth: 150, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      align: 'center', 
      headerAlign: 'center',
      flex: 0.3,
      renderCell: (params) => {
        const status = params.value;
        let color;
    
        switch (status) {
          case 'Delivered':
            color = 'success';
            break;
          case 'Processing':
            color = 'warning';
            break;
          default:
            color = 'default';
        }
    
        return <Chip label={status} color={color} variant="outlined" />;
      },
    },
    { field: 'quantity', headerName: 'Item Quantity' ,align: 'center', headerAlign: 'center', minWidth: 150, flex: 1 },
    { field: 'amount', headerName: 'Amount', minWidth: 150, flex: 1 ,align: 'center', headerAlign: 'center'},
    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 150,align: 'center',
      headerAlign: 'center',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <OpenInNewTwoTone style={{fill:"tomato"}}/>
        </Link>
      ),
    },
  ];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErros());
    }
    dispatch(myOrder());
  }, [dispatch, toast, error])
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (<>
        <section className="myOrder">
          <MetaData title={`My Orders`} />
          <div className="heading">
            <h2>My Orders</h2>
          </div>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} 
              sx={{
                '& .MuiDataGrid-row:hover': {
                  background: 'linear-gradient(to right, rgba(0, 255, 0, 0.8), rgb(0, 225, 255), rgb(255, 217, 0))',
                  transition: 'background 0.5s ease',
                },
                '& .MuiDataGrid-row': {
                  transition: 'background 0.5s ease', // Ensures smooth out too
                }
              }}
              />
          </div>
              <b style={{
                background:"black",
                width:"100%",
                color:"white",
                borderRadius:"0 0 20px 20px",
                padding:"1rem 2rem"
              }} >{user.name}' Order</b>
        </section>
      </>)}
    </>
  )
}

export default MyOrder;