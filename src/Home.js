import React,{useState,useEffect,useContext,useCallback} from 'react'
import Navbar from './Navbar'
import temp from './temp.jpg'
import {Link, useNavigate} from 'react-router-dom'

export const countContext = React.createContext()


const Home = () => {
  
  let navigate = useNavigate()

  
  const [user,setUser] = useState(localStorage.getItem('userName'))
  const [list,setList] = useState([])
  const [numberOfItems,setNumberOfItems] = useState(0)

  const getItems=async()=>{
    let response = await fetch('/api/getProductsList',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({userName:user}),
      
    })
    if(!(response.ok)){
        alert('Error getting products..')
      }
      let data = await response.json()
      setList(data.data)
      setNumberOfItems(data.number_of_items)
  }
  
  useEffect(()=>{
    if(user){
      getItems()
    }
    else{
      alert('Not logged in...')
      navigate('/')
    }
    
  },[])

  const handleAddToCart=async(item)=>{
    var obj;
    for(let i=0;i<list.length;i++){
      if(list[i].name === item){
        obj = list[i]
      }
    }
    let response = await fetch('/api/addToCart',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        userName : user,
        name : obj.name,
        price : obj.price,
        image : obj.image
      })
    })
    if(!(response.ok)){
      alert('Getting Error in adding products..')
    }
    let data = await response.json()
    alert('Item added to Cart')
    getItems()
  }


  return (
    <countContext.Provider value={numberOfItems}>
    <div className='home-page'>
      <Navbar count={numberOfItems}/>
      <div className="row">
      {list.map((item)=>{
          return(
            <div className="tab" key={item.id}>
            <img className="thumbnail" src={item.image} alt="cant load" />
            <div className="box-element-product">
              <h6><strong>{item.name}</strong></h6>
              <hr />
              <div className='item-btm'>
                <button className="btn btn-outline-secondary add-btn update-cart" onClick={()=>handleAddToCart(item.name)}>Add to Cart</button>
                <Link to={`/viewitem/${item.name}`} className="btn btn-outline-success">View</Link>
                <h4><strong>${item.price}</strong></h4>
              </div>
            </div>
          </div>
          );
          
        })}
      </div>
    </div>
    </countContext.Provider>
  )
}

export default Home