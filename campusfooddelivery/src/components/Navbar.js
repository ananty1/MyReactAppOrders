import React from 'react'
import {Link,useLocation, useNavigate } from "react-router-dom";
const Navbar = (props) => {
    let navigate = useNavigate();
    const handleLogOut =()=>{
        localStorage.removeItem("token");
        navigate("/login");
        props.showAlert("Successfully Logged Out","success");
    }

    let location = useLocation();
    React.useEffect(() => {
        console.log(location);
      }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">CFD</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                    </li>

                </ul>
                { !localStorage.getItem("token")?
                <form className="form-inline my-2 my-lg-0">
                    
                <Link className="btn btn-primary mx-2" to="/login" role='button'>Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role='button'>SignUp</Link>
                
                    
                </form>: <button className='btn btn-primary' onClick={handleLogOut}> Logout </button>}


            </div>
        </nav>
    )
}

export default Navbar