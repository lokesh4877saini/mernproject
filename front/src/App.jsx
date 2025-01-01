import './App.css'
import Header from './component/layout/Header/Header.jsx'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/product/:id' element={<ProductDetails/>} />
        <Route  path='/products'
        //  element={<Products/>}
          Component = {Products}/>
        <Route  path='/search'
        //  element={<Search/>} 
        Component = {Search} />

      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
