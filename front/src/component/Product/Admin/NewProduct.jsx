import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from './Slider.jsx';
import { toast } from 'react-hot-toast'
import { Button } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Loader from '../../layout/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { newProductByAdmin } from '../../../store/actions/productActions';
import { ADMIN_NEW_PRODUCT_REST } from '../../../store/constants/productConstants.js';
import './newproduct.scss';
import { NumbersSharp, PersonPinCircle} from '@mui/icons-material';
const NewProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { newProduct, loading,success ,error} = useSelector((state) => state.newProduct);
    useEffect(() => {
        if(error){
            toast.error(error);
        }
        if(success){
            toast.success("Product Created Successfully");
            history("/Admin/dashboard");
            dispatch({type:ADMIN_NEW_PRODUCT_REST});
        }
    }, [dispatch,error,success])
    const [imgs, setImgs] = useState([]); // Store actual File objects
    const [ImagePreview, setImagePreview] = useState([]); // Store preview URLs
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    const [item, setItem] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: ""
    });

    const handleProductData = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.set("name", item.name);
        form.set("price", item.price);
        form.set("description", item.description);
        form.set("stock", item.stock);
        form.set("category", item.category);
        imgs.forEach((img) => {
            form.append("images", img); // Actual File object
        });
        dispatch(newProductByAdmin(form));
    };

    const onFileChange = (e) => {
        const files = Array.from(e.target.files);
      
        setImgs([]);
        setImagePreview([]);
      
        files.forEach((file) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagePreview((prev) => [...prev, reader.result]);
            }
          };
      
          reader.readAsDataURL(file);
          setImgs((prev) => [...prev, file]);
        });
      };
      
    return (
        <>
            <>
                {loading ? (<Loader />)
                    :
                    (<>
            <div className='Dashboad'>
                <Slider />
                <div className="mainContainer ">
                    <h2 className='newProductheading'>Create New Product </h2>
                    <form encType="multipart/form-data" onSubmit={submitHandler}>
                        <div>
                        <SpellcheckIcon />
                            
                            <input type="text" value={item.name} autoComplete="name" placeholder="Name" name="name" onChange={handleProductData} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type="number" name="price" autoComplete="number" placeholder="Price" value={item.price} onChange={handleProductData} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea type="text"  value={item.description} autoComplete="description" placeholder="description" name="description" onChange={handleProductData} />
                        </div>
                        <div>
                            
                            <AccountTreeIcon />
                            <select name="category" value={item.category} placeholder="category" onChange={handleProductData}>
                                {
                                    categories.map((item) => (
                                        <option key={item
                                        } value={item} >{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                        <NumbersSharp />
                            <input type="number" name="stock" autoComplete="number" placeholder="Stock" value={item.stock} onChange={handleProductData} />
                        </div>
                        <div>

                            <PersonPinCircle />
                            <input type="file" name="avatar" accept="image/*" multiple onChange={onFileChange} />
                        </div>

                        <div className="previewImage">
                            {ImagePreview.map((image, index) => (
                                <img key={index} src={image} alt={`Preview ${index}`} width={100} />
                            ))}
                        </div>

                        <Button id='createproductbtn' color='tomato' type='submit'>Create</Button>
                    </form>
                </div>
            </div>
            </>)}
            </>

        </>
    )
}

export default NewProduct;