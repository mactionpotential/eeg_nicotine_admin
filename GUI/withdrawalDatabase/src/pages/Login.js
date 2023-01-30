import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const[username,getUsername] = useState('');
    const[password,getPassword] = useState('');
    const Navigate = useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const proceedLogin = (e) => {
        e.preventDefault();

        if(validation()){
            fetch('http://localhost:8000/user/' + username).then((res)=>{
                return res.json();
            }).then((resp)=>{
                if(Object.keys(resp).length === 0){
                toast.error('Please enter valid credentials');
                }else{
                    if(resp.password === password){
                        toast.success('Login Successful')
                        sessionStorage.setItem('username',username);
                        Navigate('/');
                    }
                    else{ toast.error('Please enter valid credentials'); }
                }
            }).catch((err)=> { toast.error('Login failed due to :'+err.message); });
        }
    }

    const validation = () => {
        let result = true;
        if(username === '' || username === null){
            result = false;
            toast.warning('Please Enter Username');
        }
        if(password === '' || password === null){
            result = false;
            toast.warning('Please Enter Password');
        }

        return result;
    }
    
    return ( 
        <div>
        <div className="header"><h1 className="text-center"><b>Withdrawal Database</b></h1></div>
        <div className="col-lg-6 offset-lg-3">
        <form className="container" onSubmit={proceedLogin}>
        <div className="card">

            <div className="card-header"><h2>User Login</h2></div>

            <div className="card-body">
                <div className="form-group">
                    <label>Username<span className="errmsg">*</span></label>
                    <input value={username} onChange={e=>getUsername(e.target.value)} className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Password<span className="errmsg">*</span></label>
                    <input type='password' value={password} onChange={e=>getPassword(e.target.value)} className="form-control"></input>
                </div>
            </div>

            <div className="card-footer">
                <button type="submit" className="btn btn-primary">Login</button>  Need an account?
                <a className="btn btn-danger" href="/register">Register</a>
            </div>

        </div>
        </form>
        </div>
        </div>
     );
}
 
export default Login;
