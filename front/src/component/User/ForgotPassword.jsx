import {MarkEmailReadSharp } from '@mui/icons-material'
import Loader from '../layout/loader/Loader';
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert';
// import Loader from '../layout/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import { ClearErros, forgotPassword } from '../../store/actions/userActions';
import './EditProfile.scss';
const ForgotPassword = () => {
    const history = useNavigate();
    const alert = useAlert();
    const  [email,setEmail] = useState("");
    const {message,error,loading} = useSelector((state)=>state.forgotPassword);
    const dispatch = useDispatch();
    useEffect(() => {
        if(message){
            alert.success(message);
        }
        if (error) {
            alert.error(error);
            dispatch(ClearErros());
        }
    }, [dispatch, error, alert,message, history]);
    const ForgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email",email);
        dispatch(forgotPassword(myForm))
    }
    return (<>
        {loading ?
            (<Loader />) : (
                <>
                    <MetaData title={"Reset Password"} />
                    <div className="container">
                        <div className="updateContainer">
                            <h1>Forgot Password</h1>
                            <div className="formContainer">
                                <form className="UpdateForm" encType="multipart/form-data" onSubmit={ForgotPasswordSubmit} >
                                    <div className="UpdateEmail">
                                        <MarkEmailReadSharp />
                                        <input type="email" name="email" autoComplete="email" placeholder="Enter Valid Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Send Email" className="UpdateBtn" disabled={loading ? true : false} />
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
    </>)
}
export default ForgotPassword;