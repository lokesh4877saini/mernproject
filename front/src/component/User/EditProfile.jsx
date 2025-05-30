import { Mail, Face4Sharp} from '@mui/icons-material'
import Loader from '../layout/loader/Loader';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux';
import {ClearErros,loadUser,updateProfile} from '../../store/actions/userActions';
import './EditProfile.scss';
import { UPDATE_USER_RESET } from '../../store/constants/userConstants';
const EditProfile = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user); 
    const {isUpdated,loading,error} = useSelector((state)=>state.profile);
    const [name,setName] = useState("");
    const [email,setEmail]= useState("");
    const [avatar,setAvatar]= useState("");
    const [avatarPreview,setAvatarPreview] = useState();
    const UpdateDataChange = (e)=>{
        const reader = new FileReader();
        reader.onload =()=>{      
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error){
           toast.error(error);
           dispatch(ClearErros());
        }
        if(isUpdated){
            toast.success("Profile Upated Successfully !");
            history('/account');
            dispatch({
                type:UPDATE_USER_RESET,
            });
        }
   },[dispatch,error,toast,history,user,isUpdated]);
    const UpdateSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateProfile(myForm))
    }
    return (<>
    {loading ?
     (<Loader/>):(
        <>
        <MetaData title="Update Profile" />
        <div className="container">
            <div className="updateContainer">
                <h1>Update Profile</h1>
                <div className="formContainer">
                    <form className="UpdateForm" encType="multipart/form-data" onSubmit={UpdateSubmit} >
                        <div className="UpdateName">
                            <Face4Sharp />
                            <input type="text" value={name} autoComplete="name" placeholder="Name" name='name' onChange={(e)=>setName(e.target.value)}  />
                        </div>
                        <div className="UpdateEmail">
                            <Mail />
                            <input type="email" autoComplete="email" placeholder="Email"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div id="UpdateImage">
                            {<img src={avatarPreview} alt="Avatar Preview" />}
                            <input type="file" name="avatar" accept="image/*" onChange={UpdateDataChange} />
                        </div>
                        <input type="submit" value="Update" className="UpdateBtn"  />
                    </form>
                </div>
            </div>
        </div>
        </>
           )}
    </>)
}
export default EditProfile;