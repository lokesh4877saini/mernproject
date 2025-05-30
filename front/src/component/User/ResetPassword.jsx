import { Lock,LockOutlined } from '@mui/icons-material'
import Loader from '../layout/loader/Loader';
import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import { ClearErros, resetPassword } from '../../store/actions/userActions';
import './EditProfile.scss';
const ResetPassword = () => {
    const dispatch = useDispatch();
    const {token} = useParams();
    const history = useNavigate();
    const { error, loading, success } = useSelector((state) => state.forgotPassword);
    const [user, setUser] = useState({
        Password: "",
        ConfirmPassword: ""
    });
    const {Password, ConfirmPassword } = user;
    const ResetPasswordDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ClearErros());
        }
        if (success) {
            toast.success("Password Updated Successfully !");
            history('/login');
        }
    }, [dispatch, error, toast, history, success, loading]);
    const UpdateSubmit = (e) => {
        e.preventDefault();
         if (!Password || !ConfirmPassword) {
            toast.error("All fields are required");
            return;
        }
        const myForm = new FormData();
        myForm.set("password", Password);
        myForm.set("confirmPassword", ConfirmPassword);
        dispatch(resetPassword(token,myForm))
    }
    return (<>
        {loading ?
            (<Loader />) : (
                <>
                    <MetaData title={"Reset Password"} />
                    <div className="container">
                        <div className="updateContainer">
                            <h1>Reset Password</h1>
                            <div className="formContainer">
                                <form className="UpdateForm" encType="multipart/form-data" onSubmit={UpdateSubmit} >
                                    <div className="UpdateEmail">
                                        <LockOutlined />
                                        <input type="password" name="Password" autoComplete="email" placeholder="Password" value={Password} onChange={ResetPasswordDataChange} />
                                    </div>
                                    <div className="UpdatePassword">
                                        <Lock />
                                        <input type="password" name="ConfirmPassword" autoComplete="current-password" placeholder="Confirm Password" value={ConfirmPassword} onChange={ResetPasswordDataChange} />
                                    </div>
                                    <input type="submit" value="Reset Password" className="UpdateBtn" disabled={loading ? true : false} />
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
    </>)
}
export default ResetPassword;