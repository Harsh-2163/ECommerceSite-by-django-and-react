import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import {Link,useNavigate} from 'react-router-dom'
import arrowUp from './arrow-up.png'
import arrowDown from './arrow-down.png'
import temp from './temp.jpg'
const Cart = () => {

  let navigate = useNavigate()

  const [user,setUser] = useState(localStorage.getItem('userName'))
  const [list,setList] = useState([])
  const [products,setProducts] = useState([])
  const [count,setCount] = useState(0)
  const [total,setTotal] = useState(0)

  console.log(count)
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

  const handleIncreaseCount=async(ide)=>{
    let temp;
    for(let i=0;i<products.length;i++){
      if(ide === products[i].id){
        temp = products[i]
      }
    }
    let response = await fetch('/api/addToCart',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        userName : user,
        name : temp.name,
        price : temp.price,
        image : temp.image
      })
    })
    if(!(response.ok)){
      alert('Getting Error in adding products..')
    }
    let data = await response.json()
    alert('Item added to Cart')
  }
  const handleDecreaseCount=async(ide)=>{
    let temp;
    for(let i=0;i<products.length;i++){
      if(ide === products[i].id){
        temp = products[i]
      }
    }
    let response = await fetch('/api/removeFromCart',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        userName : user,
        name : temp.name,
        price : temp.price,
        image : temp.image
      })
    })
    if(!(response.ok)){
      alert('Getting Error in removing products..')
    }
    let data = await response.json()
    alert('Item removed from Cart')
    
  }
  return (
    <div className='cart-page'>
      <Navbar count={count}/>
      <div className="cartrow">
          <div className="elembox">
            <Link to='/home' className="continue-shop">&#x2190; Continue Shopping</Link>
            <br />
            <br />
            <table className="table">
              <thead>
              <tr>
                  <th><h5>Items: <strong>{count}</strong></h5></th>
                  <th><h5>Total:<strong> ${total}</strong></h5></th>
                  <th>
                      <Link to='/checkout' className="btn btn-success">Checkout</Link>
                  </th>
              </tr>
              </thead>
            </table>
          </div>
          <br />
          <div className="cart-items">
          <div className="cart-row">
              <div className='flex-cont'><strong>Image</strong></div>
              <div className='flex-cont'><strong>Item</strong></div>
              <div className='flex-cont'><strong>Price</strong></div>
              <div className='flex-cont'><strong>Quantity</strong></div>
              <div className='flex-cont'><strong>Total</strong></div>
            </div>
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
                <div className="cart-items-list" key={item.id}>
                  <div className='cart-item-img'><img src={data.image} alt='cant load' /></div>
                    <div className='cart-item-text'><p>{data.name}</p></div>
                    <div className='cart-item-price'><p>${data.price}</p></div>
                    <div className='cart-item-quantity'>
                      <p>{item.quantity}</p>
                      <div className="cart-item-quantity-btn">
                        <img className="chg-quantity update-cart" onClick={()=>handleIncreaseCount(data.id)} src={arrowUp} alt='+'/>
                        <img className="chg-quantity update-cart" onClick={()=>handleDecreaseCount(data.id)} src={arrowDown} alt='-'/>
                      </div>
                    </div>
                  <div className='cart-item-total'><p>${(item.quantity)*(data.price)}</p></div>
                </div>
              );
            })}
            
          </div>
            
        </div>
    </div>
  )
}

export default Cart