import React,{useState,useEffect} from 'react'
import temp from './temp.jpg'
import Navbar from './Navbar'
import { Link,useNavigate,useParams } from 'react-router-dom'
const Viewitem = () => {

    const [item,setItem] = useState({})
    const [user,setUser] = useState(localStorage.getItem('userName'))

    const {itemname} = useParams()

    const getItem=async()=>{
        let response = await fetch('/api/getItem',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName : user,
                itemName : itemname
            })
        })
        if(!(response.ok)){
            alert('Error, in getting data')
        }
        let data = await response.json()
        setItem(data.item)
    }

    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            getItem()
        }
        else{
            
            alert('Not logged in...')
            navigate('/')
        }
    },[])
  return (
    <div className='viewitem-page'>
        <Navbar />
        <div className='item-center'>
            <Link className='btn-from-view' to='/home'>&#x2190; Back To Home</Link>
         
            <div className='item-image'>
                <img src={item.image} alt='cant load' />
            </div>
            <div className='item-head'>
                <h3>{item.name}</h3>
            </div>
            <div className='item-price'>
                <h4>${item.price}</h4>
            </div>
            <div className='item-description'>
                <p>aweawefefewferfawefefewferfawefefewferfa</p>
                <p>aweawefefewferfawefefewferfawefefewferfa</p>
                <p>aweawefefewferfawefefewferfawefefewferfa</p>
                <p>aweawefefewferfawefefewferfawefefewferfa</p>
                
            </div>
        </div>
    </div>
  )
}

export default Viewitem