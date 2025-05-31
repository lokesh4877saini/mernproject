import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-hot-toast'
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';
import {getAllProductsForAdmin} from '../../../store/actions/productActions';
import {OpenInNewTwoTone} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import './productlist.scss';
const ProductList = () => {
  const { product:products, error, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const rows=[];
  Array.isArray(products) && products.forEach(order => {
    rows.push(
      {id : order._id,
      name:order.name,
      stock:order.stock,
      price:order.price
      }
    )
  });
  const columns = [
    { field: 'id', headerName: 'Product Id',align: 'center', headerAlign: 'center', minWidth: 150, flex: 1 },
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 150,
      align: 'center', 
      headerAlign: 'center',
      flex: 0.3,
    },
    { field: 'stock', headerName: 'Stock' ,align: 'center', headerAlign: 'center', minWidth: 150, flex: 1 },
    { field: 'price', headerName: 'Price', minWidth: 150, flex: 1 ,align: 'center', headerAlign: 'center'},
    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 150,align: 'center',
      headerAlign: 'center',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/admin/product/${params.row.id}`}>
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
    dispatch(getAllProductsForAdmin());
  }, [dispatch, toast, error])
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (<>
        <section className="productList">
          <MetaData title={`Product List - Admin(${user.name})`} />
          <div className="heading">
            <h2>All Products</h2>
          </div>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} 
              sx={{
                '& .MuiDataGrid-row:hover': {
                  background: 'black',
                  color:"white",
                  transition: 'background 0.1s ease',
                },
                '& .MuiDataGrid-row': {
                  transition: 'background 0.7s ease', // Ensures smooth out too
                  background: 'linear-gradient(to right, rgba(0, 255, 0, 0.1), rgb(0, 225, 255), rgb(255, 217, 0))'
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
              }} >Admin {user.name} Product List</b>
        </section>
      </>)}
    </>
  )
}

export default ProductList;