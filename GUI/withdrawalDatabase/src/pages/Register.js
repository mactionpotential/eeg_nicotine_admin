import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './css/Register.css';

const Register = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[password,passwordchange]=useState("");
    const[email,emailchange]=useState("");

    const navigation=useNavigate();

    const isValidate =()=>{
        let isproceed=true;
        let errormessage = 'Please enter ';
        if(id===null||id===''){
            isproceed=false;
            errormessage += 'Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }
        else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handlesubmit=(e)=>{
    
        e.preventDefault();
        let regobj={id,name,password,email}
        //console.log(regobj);
        if(isValidate()){
            fetch("http://localhost:8000/user",{
                method:"POST",
                headers: {'content-type':'application/json'},
                body:JSON.stringify(regobj)
            }).then((res)=>{
                toast.success('Registered Successfully!')
                navigation('/login');
            }).catch((err)=>{
                toast.error('Failed to Register...'+err.message);
            });
        }
    }
    return ( 
        <div className="wrapper">
        <div className="header">
            <h1 className="Title"><b>Withdrawal Database</b></h1>
        </div>
        <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
            <div className="card">

                <div className="card-header"><h1>User Registration</h1></div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Username<span className="errmsg">*</span></label>
                                <input value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Full Name<span className="errmsg">*</span></label>
                                <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Email<span className="errmsg">*</span></label>
                                <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Register</button>
                    <div>Already have an account? <a href="/login">Login</a></div>
                </div>
                
            </div>
        </form>
        </div>
        </div>
     );
}
 
export default Register;