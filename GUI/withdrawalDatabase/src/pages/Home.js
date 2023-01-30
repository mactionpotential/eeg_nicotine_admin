import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const Navigate = useNavigate();
    const [displayuser,displayuserUpdate] = useState('');

    useEffect(()=>{
        let username = sessionStorage.getItem('username');
        if(username===''||username===null){
            Navigate('/login');
        }else{
            displayuserUpdate(username);
        }
    },[Navigate]);

    return ( 
        <div>
            <div className="header">
                <Link id="homeLink" to={'/'}>Home</Link>
                |
                <Link id="logoutLink"to={'/login'}>Logout</Link>
                <h1 className="text-center">
                    <b>Withdrawal Database | </b>
                    <span style={{fontSize:25}}>Welcome <b>{displayuser}</b>!</span>
                </h1>
                <br/>
            </div>
        </div>
     );
}
 
export default Home ;