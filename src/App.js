import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import { jwtDecode } from "jwt-decode";
import CustomerRefreshToken from './Services/TokenServices/CustomerRefreshToken';
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import CustomersLogin from "./Components/Customers/CustomersLogin";
import { setToken, getToken, removeToken } from './Services/TokenServices/TokenService';
import CustomersRegister from './Components/Customers/CustomersRegister';
import AdminRefreshToken from './Services/TokenServices/AdminRefreshToken';
import AdminsLogin from './Components/Admin/AdminsLogin';
import CategoryManage from './Pages/CategoryManage';
import PromotionManage from './Pages/PromotionManage';
import CustomerManage from './Pages/CustomerManage';
import ProductManage from './Pages/ProductManage';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Products from './Components/Products/Products';
import Footer from "./Components/Footer/Footer";
import InvoiceManage from './Pages/InvoiceManage';

function App() {

  const [userLogin, setUserLogin] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth().catch(() => setAuthenticated(false))
  }, [authenticated])

  const customerRefreshToken = async (token) => {
    try {

      const res = await CustomerRefreshToken(token);

      if (res.code === 200) {
        setToken(res.result?.token);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(false)
    }
  }

  const adminRefreshToken = async (token) => {
    try {

      const res = await AdminRefreshToken(token);

      if (res.code === 200) {
        setToken(res.result?.token);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setAuthenticated(false)
    }
  }

  const auth = async () => {
    const token = getToken();
    if (!token) {
      setAuthenticated(false);
      return
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration === now) {
      if (decoded.scope === "ROLE_CUSTOMER") {
        await customerRefreshToken(token)
      } else if (decoded.scope === "ROLE_ADMIN") {
        await adminRefreshToken(token)
      }
    } else if (tokenExpiration > now) {
      setAuthenticated(true)
    } else if (tokenExpiration < now) {
      if (tokenExpiration < tokenExpiration + 36000) {
        removeToken();
        if (decoded.scope === "ROLE_CUSTOMER") {
          await customerRefreshToken(token)
        } else if (decoded.scope === "ROLE_ADMIN") {
          await adminRefreshToken(token)
        }
      } else {
        removeToken();
      }
    }
  }

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100" style={{ backgroundColor: '#FFF' }}>
      <BrowserRouter>
        <div className='container-fuild' style={{ backgroundColor: '#E8F0FE' }}>
          <Navigation userLogin={userLogin} setUserLogin={setUserLogin} />
        </div>
        <div className="container-fluid p-0 main-content" >
          <Routes>
            <Route path='/' element={<Home />} >
              <Route path='/:id' element={<Products />} />
            </Route>
            <Route path='/:categoryId/product/:id' element={<ProductDetail userLogin={userLogin} />} ></Route>
            <Route path='/login' element={<CustomersLogin />} />
            <Route path='/register' element={<CustomersRegister />} />
            <Route path='/admin/login' element={<AdminsLogin />} />
            <Route path='/cart' element={<Cart userLogin={userLogin} />} ></Route>
            <Route path='/manage_category' element={<CategoryManage />} />
            <Route path='/manage-promotion' element={<PromotionManage />} />
            <Route path='/manage_customer' element={<CustomerManage />} />
            <Route path='/manage_product' element={<ProductManage />} />
            <Route path='/manage-invoice' element={<InvoiceManage />} />
          </Routes>
        </div>
        <div className="container-fluid bg-light mt-4">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
