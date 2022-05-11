import React,{useState,useEffect,useContext} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {countContext} from './Home'
import cart from './cart.png'
const Navbar = (ct) => {

    const [user,setUser] = useState(localStorage.getItem('userName'))

    const [isLogedIn,setIsLogedIn] = useState(true)

    let navigate = useNavigate()
    const handleLogout=async()=>{
        alert('Loging Out')
        localStorage.removeItem('userName')
        setIsLogedIn(false)
        navigate('/')
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark cnav">
        <p className="navbar-brand">E-Com</p>
        <p><Link className="navbar-brand" to="/home">Home</Link></p>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="cnavbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0 cform-inline" >
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <h2 className='userTag'>Welcome , {user}</h2>
            {isLogedIn && <button type='button' className='logout-btn' onClick={handleLogout}>Logout</button>}
            </div>
        <div className="cform-inline my-2 my-lg-0">
                <Link to='/cart' className='cartimg'>
                    <img  id="carticon" src={cart} alt='cant load'/>
                    <p className="cart-total">{ct.count}</p>
                </Link>
                
        
        </div>
    </nav>
  )
}

export default Navbar