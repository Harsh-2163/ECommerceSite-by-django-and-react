import {HashRouter,Routes,Route} from "react-router-dom"
import Home from './Home'
import Welcome from './Welcome'
import Cart from './Cart'
import Checkout from './Checkout'
import ViewItem from './Viewitem';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Welcome />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/viewitem/:itemname' element={<ViewItem />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
