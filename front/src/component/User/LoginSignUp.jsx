import "./LoginSignUp.scss";
import { useRef, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {MailOutline,LockOutlined, Mail,Face4Sharp, Lock,Photo} from '@mui/icons-material'
import Loader from '../layout/loader/Loader';
import { useNavigate } from "react-router-dom";
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux';
import MetaData from '../layout/MetaData'
import {ClearErros,login,register} from '../../store/actions/userActions';
const LoginSignUp = () => {
    const history = useNavigate();
    const alert = useAlert();
    const {error,loading,isAuthenticated} = useSelector((state) => state.user); 
    const dispatch = useDispatch();
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const [isChange,setIsChange] = useState(true);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user,setUser] =useState({  
        name:"",
        email:"",
        password:""
    });
    const {name,email,password}  = user;
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword ))
    }
    useEffect(()=>{
         if(error){
            alert.error(error);
            dispatch(ClearErros());
         }
         if(isAuthenticated){
            history('/account')
         }
    },[dispatch,error,alert,history,isAuthenticated,loading]); 
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    const registerDataChange = (e)=>{
        setIsChange(false);
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload =()=>{      
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user,[e.target.name]:e.target.value});
        }
    }
    const registerSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        dispatch(register(myForm))
    }
    return (<>
       {loading ? (<Loader/>):(
         <div className="LSContainer">
            <div className="LSBox">
                <div>
                    <div className="login_singUp_toggle">
                        <p onClick={(e) => switchTabs(e, "login")} >LOGIN</p>
                      <p onClick={(e) => switchTabs(e, "register")} >REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutline />
                        <input type="email" placeholder="Email" autoComplete="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="loginPassword">
                        <LockOutlined />
                        <input type="password" placeholder="Password" autoComplete="current-password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <Link to='/password/forgot'>Forget Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn" />
                </form>
                <form ref={registerTab} className="singUpForm" encType="multipart/form-data" onSubmit={registerSubmit} >
                    <div className="signUpName">
                        <Face4Sharp/>
                        <input type="text" value={name} autoComplete = "name"  placeholder="Name" name="name" onChange={registerDataChange} />
                    </div>
                    <div className="signUpEmail">
                        <Mail/>
                        <input type="email" name="email" autoComplete="email" placeholder="Email" value={email} onChange={registerDataChange} />
                    </div>
                    <div className="signUpPassword">
                        <Lock/>
                        <input type="password" name="password" autoComplete="current-password" placeholder="Password" value={password} onChange={registerDataChange}/>
                    </div>
                    <div id="signUpImage">
                        {isChange ? (<Photo />) : (<img src={avatarPreview} alt="Avatar Preview" />)}
                        <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}  />
                    </div> 
                   <input type="submit" value="Register" className="signUpBtn" disabled={loading ? true : false} />
                </form>
            </div>
        </div>
       )}
    </>)
}
export default LoginSignUp;