import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Welcome = () => {
    const [signupActive,setSignupActive] = useState(true)

    const [signupUserName,setSignupUserName] = useState('')
    const [signupEmail,setSignupEmail] = useState('')
    const [signupPassword,setSignupUserPassword] = useState('')

    const [loginUserName,setLoginUserName] = useState('')
    const [loginPassword,setLoginPassword] = useState('')
    
    const [showAlert,setShowAlert] = useState(false)
    const [alertText,setAlertText] = useState('')

    let navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            setShowAlert(false)
            setAlertText('')
        },3000)
    },[showAlert])


    const handleSignupSubmit=async(e)=>{
        e.preventDefault()
        fetch('/api/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName : signupUserName,
                userEmail : signupEmail,
                userPassword : signupPassword
            }), 
        })
        .then((response)=>{
            if(response.ok){
                alert('Signup successful')
            }
            else if(response.status === 500)
            {
                alert('Some error occured at backend.')
            }
            else{
                console.log('Customer already exists')
                setShowAlert(true)
                setAlertText('Customer name already exists, try different one..')
            }
            return response.json()
        })
        .then((data)=>{
            if(data){
                localStorage.setItem('userName',data.customer.name)
                navigate('/home')
            }
        })
        
    }
    
    const handleLoginSubmit = (e)=>{
        e.preventDefault()
        fetch('/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName : loginUserName,
                userPassword : loginPassword
            }),
        })
        .then((response)=>{
            if(response.ok){
                alert('Login successful')
            }
            else if(response.status === 500){
                alert('Some error occured at backend')
            }
            else{
                setShowAlert(true)
                setAlertText('Invalid Credentials')
            }
            return response.json()
        })
        .then((data)=>{
            if(data){
                localStorage.setItem('userName',data.customer.name)
                navigate('/home')
            }
        })
    }
    return (
        
      <div className='welcome-page'>
          <div id='showcase'>
             <h1> Welcome, This is ECommerce Site, made by HARSH VAISHNAV</h1>
          </div>
        <div className="form-wrap container" id='content'>
            <div className="tabs">
                <h3 className="signup-tab"><p className={`${signupActive?'active':''}`} onClick={()=>setSignupActive(!signupActive)}>Sign Up</p></h3>
                <h3 className="login-tab"><p className={`${signupActive?'':'active'}`} onClick={()=>setSignupActive(!signupActive)}>Login</p></h3>
            </div>
            <div className="tabs-content">
                {showAlert && <h2 className='alert'>{alertText}</h2>}
                <div id="signup-tab-content" className={`${signupActive?'active':''}`}>
                    <form className="signup-form">
                        <input 
                            type="email" 
                            className="input" 
                            id="signupEmail"  
                            placeholder="Email"
                            name='userEmail' 
                            value={signupEmail}
                            onChange={(e)=>setSignupEmail(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="input" 
                            id="signupName"  
                            placeholder="Username" 
                            name='userName'
                            value={signupUserName}
                            onChange={(e)=>setSignupUserName(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className="input" 
                            id="signupPass"  
                            placeholder="Password" 
                            name='userPassword'
                            value={signupPassword}
                            onChange={(e)=>setSignupUserPassword(e.target.value)}
                        />
                        <button type="submit" className="button" onClick={handleSignupSubmit}>Signup</button>
                    </form>
                    <div className="help-text">
                        <p>By signing up, you agree to our Terms of service</p>
                    </div>
                </div>
                <div id="login-tab-content" className={`${signupActive?'':'active'}`}>
                    <form className="login-form">
                        <input 
                            type="text" 
                            className="input" 
                            id="loginName"  
                            placeholder="Username" 
                            name='userName'
                            value={loginUserName}
                            onChange={(e)=>setLoginUserName(e.target.value)}
                        />
                        <input 
                            type="password" 
                            className="input" 
                            id="loginPass"  
                            placeholder="Password" 
                            name='userPassword'
                            value={loginPassword}
                            onChange={(e)=>setLoginPassword(e.target.value)}
                        />
                        <button type="submit" className="button" onClick={handleLoginSubmit}>Login</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Welcome