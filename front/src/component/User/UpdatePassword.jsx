import { Lock, PasswordTwoTone, LocalDrink, LockClockTwoTone, LockOutlined } from '@mui/icons-material'
import Loader from '../layout/loader/Loader';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
// import Loader from '../layout/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import { ClearErros, updatePassword } from '../../store/actions/userActions';
import './EditProfile.scss';
import { USER_PASSWORD_UPDATE_RESET } from '../../store/constants/userConstants';
const UpdatePassword = () => {
    const history = useNavigate();
    const alert = useAlert();
    const { error, loading, isUpdated } = useSelector((state) => state.profile);
    const [user, setUser] = useState({
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
    });
    const { OldPassword, NewPassword, ConfirmPassword } = user;
    const dispatch = useDispatch();
    const registerDataChange = (e) => {
        console.log(e.target.name, e.target.value)
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearErros());
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully !");
            history('/account');
            dispatch({ type: USER_PASSWORD_UPDATE_RESET, });
        }
    }, [dispatch, error, alert, history, isUpdated, loading]);
    const UpdateSubmit = (e) => {
        e.preventDefault();
        console.log("OldPassword:", OldPassword);
        console.log("NewPassword:", NewPassword);
        console.log("ConfirmPassword:", ConfirmPassword);

        if (!OldPassword || !NewPassword || !ConfirmPassword) {
            alert.error("All fields are required");
            return;
        }

        const myForm = new FormData();
        myForm.set("oldPassword", OldPassword);
        myForm.set("newPassword", NewPassword);
        myForm.set("confirmPassword", ConfirmPassword);
        dispatch(updatePassword(myForm))
    }
    return (<>
        {loading ?
            (<Loader />) : (
                <>
                    <MetaData title={"Reset Password"} />
                    <div className="container">
                        <div className="updateContainer">
                            <h1>Update Password</h1>
                            <div className="formContainer">
                                <form className="UpdateForm" encType="multipart/form-data" onSubmit={UpdateSubmit} >
                                    <div className="UpdateName">
                                        <PasswordTwoTone />
                                        <input type="passowrd" value={OldPassword} autoComplete="OldPassword" placeholder="Old Password" name="OldPassword" onChange={registerDataChange} />
                                    </div>
                                    <div className="UpdateEmail">
                                        <LockOutlined />
                                        <input type="password" name="NewPassword" autoComplete="email" placeholder="New Password" value={NewPassword} onChange={registerDataChange} />
                                    </div>
                                    <div className="UpdatePassword">
                                        <Lock />
                                        <input type="password" name="ConfirmPassword" autoComplete="current-password" placeholder="Confirm New Password" value={ConfirmPassword} onChange={registerDataChange} />
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
export default UpdatePassword;