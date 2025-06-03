import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect,useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast'
import Loader from '../../layout/loader/Loader';
import MetaData from '../../layout/MetaData';
import {getAllProductsForAdmin,deleteProductByAdmin} from '../../../store/actions/productActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import './productlist.scss';
const ProductList = () => {
  const { product:products, error, loading } = useSelector((state) => state.products);
  const {isDeleted}  = useSelector((state)=>state.deleteProduct)
  const [isDisable, setIsDisable] = useState(false);
  const history = useNavigate();
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
        <>
        <Link to={`/admin/edit/product/${params.row.id}`}>
          <EditIcon style={{fill:"yellow"}}/>
        </Link>
        <button disabled={isDisable} style={{padding:"0.1rem",background:"transparent",outline:"none",border:"none",cursor:"pointer"}} onClick={()=>{deleteProductHandler(params.row.id)}}>
          <DeleteIcon style={{fill:"red"}}/>
        </button>
        </>
      ),
    },
  ];
  const deleteProductHandler=(id)=>{
    setIsDisable(true);
    window.location.reload();
    dispatch(deleteProductByAdmin(id))
  }
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErros());
    }
    if(isDeleted){
      toast.success("Product Deleted Successfully");
      history("/admin/products")
    }
    dispatch(getAllProductsForAdmin());
  }, [dispatch,error,isDeleted])
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
          <div style={{  width: '100%'  }}>
            <DataGrid rows={rows} columns={columns} 
              sx={{
                '& .MuiDataGrid-row:hover': {
                  background: 'black',
                  color:"white",
                  transition: 'background 0.1s ease',
                },
                '& .MuiDataGrid-row': {
                  transition: 'background 0.7s ease', // Ensures smooth out too
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
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