import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import temp from './temp.jpg'
import {Link,useNavigate} from 'react-router-dom'

const Checkout = () => {
  let navigate = useNavigate()

  const [user,setUser] = useState(localStorage.getItem('userName'))
  const [list,setList] = useState([])
  const [products,setProducts] = useState([])
  const [count,setCount] = useState(0)
  const [total,setTotal] = useState(0)

  const [billingName,setBillingName] = useState('')
  const [billingEmail,setBillingEmail] = useState('')
  const [billingAddress,setBillingAddress] = useState('')
  const [billingCity,setBillingCity] = useState('')
  const [billingState,setBillingState] = useState('')
  const [billingZipcode,setBillingZipcode] = useState('')

  const getCart=async()=>{
    let response = await fetch('/api/getCartItems',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        userName : user
      })
    })

    if(!(response.ok)){
      alert('Error getting data')
    }

    let data = await response.json()
    setList(data.list)
    setProducts(data.products)
    setCount(data.count)
    setTotal(data.total)
    
    console.log('data')
  }

  const handleSubmit=async()=>{

    let response = await fetch('/api/processOrder',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        userName:user,
        email : billingEmail,
        address : billingAddress,
        city : billingCity,
        state : billingState,
        zipcode : billingZipcode
      })
    })
    if(!(response.ok)){
      alert('Error in Transaction')
    }
    else{
     alert('Transaction successful')
     alert('Thanks for purchasing......')
     alert('loging out')
     localStorage.removeItem('userName')
     navigate('/')

    }
  }
  
  useEffect(()=>{
    
    if(user){
      getCart()
    }
    else{
      alert('Not logged in...')
      navigate('/')
    }
    
  },[])
  return (
    <div className='checkout-page'>
      <Navbar count={count}/>
      <div className="checkout-main">
        <div className="col-lg-6">
          <div className="box-element" id="form-wrapper">
            <form id="form">
              <div id="user-info">
                <div className="form-field">
                    <input 
                        required 
                        className="form-control" 
                        type="text" 
                        name="name" 
                        placeholder="Name.." 
                        value={billingName}
                        onChange={(e)=>setBillingName(e.target.value)}/>
                </div>
                <div className="form-field">
                    <input 
                        required 
                        className="form-control" 
                        type="email" 
                        name="email" 
                        placeholder="Email.."
                        value={billingEmail}
                        onChange={(e)=>setBillingEmail(e.target.value)}/>
                </div>
              </div>
          
              <div id="shipping-info">
                <hr />
                <p>Shipping Information:</p>
                <hr />
                <div className="form-field">
                    <input 
                        className="form-control" 
                        type="text" 
                        name="address" 
                        placeholder="Address.."
                        value={billingAddress}
                        onChange={(e)=>setBillingAddress(e.target.value)} />
                </div>
                <div className="form-field">
                    <input 
                        className="form-control" 
                        type="text" 
                        name="city" 
                        placeholder="City.." 
                        value={billingCity}
                        onChange={(e)=>setBillingCity(e.target.value)}/>
                </div>
                <div className="form-field">
                    <input 
                        className="form-control" 
                        type="text" 
                        name="state"
                        placeholder="State.." 
                        value={billingState}
                        onChange={(e)=>setBillingState(e.target.value)}/>
                </div>
                <div className="form-field">
                    <input 
                        className="form-control" 
                        type="text" name="zipcode" 
                        placeholder="Zip code.."
                        value={billingZipcode}
                        onChange={(e)=>setBillingZipcode(e.target.value)} />
                </div>
              </div>
              <hr />
              <button
                  id="form-button" 
                  className="btn btn-success btn-block" 
                  type="button"
                  onClick={handleSubmit}> 
                  Submit</button>
            </form>
          </div>
          <br />
          <div className="box-element hidden" id="payment-info">
            <small>Paypal Options</small>
            <button id="make-payment">Make Payment</button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="box-element">
            <Link  className="btn btn-outline-dark" to='/cart'>&#x2190; Back to Cart</Link>
            <hr />
            <h3>Order Summary</h3>
            <hr />
            {list.map((item)=>{
              let data;
              let url;
              for(let i=0;i<products.length;i++){
                if(products[i].id === item.product)
                {
                  data = products[i]
                }
              }
              return (
                <div className="checkout-cart-row" key={item.id}>
                  <div className='checkout-cart-img'><img src={data.image} alt='cant load'/></div>
                  <div className='checkout-cart-text'><p>{data.name}</p></div>
                  <div className='checkout-cart-text'><p>${data.price}</p></div>
                  <div className='checkout-cart-text'><p>{item.quantity}</p></div>
              </div>
              );
            })}
            <h5 className='checkout-cart-btm' >Items: {count}</h5>
            <h5 className='checkout-cart-btm'>Total: ${total}</h5>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Checkout