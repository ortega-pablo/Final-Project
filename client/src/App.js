import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detail } from "./components/Detail/Detail";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/NavBar/NavBar";
import { NotFound } from "./components/NotFound/NotFound";
import { About } from "./components/About/About";
import { Login } from "./components/Login/Login";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { UseFormControl} from "./components/Forms/UseFormControl";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AllCategories from "./components/AdminPanel/AllCategories";
import AdminCategories from "./components/AdminPanel/AdminCategories";
import AllProducts from "./components/AdminPanel/AllProducts";
import AdminProducts from "./components/AdminPanel/AdminProducts";
import AllDiscounts from "./components/AdminPanel/AllDiscounts";
import AdminDiscount from "./components/AdminPanel/AdminDiscounts";
// IMPORTS PARA TESTEAR (HAY QUE ELIMINAR)
import { AdminCatAndSubc } from "./components/Forms/AdminCatAndSubca/AdminCatAndSubc";




function App() {
  return (
    
    <BrowserRouter >
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/home/:name" element={<Home />} />
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/createaccount" element={<CreateAccount/>}/>
            <Route path="/forgotpassword" element ={<ForgotPassword/>}/>
            <Route path="/createProduct" element={<UseFormControl/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/adminPanel" element={<AdminPanel/>}/>
            <Route path="/allCategories" element={<AllCategories/>}/>
            <Route path="/adminCategories" element={<AdminCategories/>}/>
            <Route path="/allProducts" element={<AllProducts/>}/>
            <Route path="/adminProducts" element={<AdminProducts/>}/>
            <Route path="/allDiscounts" element={<AllDiscounts/>}/>
            <Route path="/adminDiscounts" element={<AdminDiscount/>}/>

            {/* rutas para testear  */}
            <Route path='/agregarcategoria' element={<AdminCatAndSubc />}/>
          
          </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
