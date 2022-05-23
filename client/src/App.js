import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detail } from "./components/Detail/Detail";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/NavBar/NavBar";
import { NotFound } from "./components/NotFound/NotFound";
import { About } from "./components/About/About";
import { Login } from "./components/Login/Login";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import AdminPanel from "./components/AdminPanel/AdminPanel";

import AllCategories from "./components/AdminPanel/AllCategories";
import AllProducts from "./components/AdminPanel/AllProducts";
import AllDiscounts from "./components/AdminPanel/AllDiscounts";
import AllStock from "./components/AdminPanel/AllStock";
import AllSpecifications from "./components/AdminPanel/AllSpecifications";

import AdminCategories from "./components/AdminPanel/AdminCategories";
import AdminProducts from "./components/AdminPanel/AdminProducts";
import AdminDiscounts from "./components/AdminPanel/AdminDiscounts";
import AdminStock from "./components/AdminPanel/AdminStock";
import AdminSpecifications from "./components/AdminPanel/AdminSpecifications";

import CreateCategory from "./components/AdminPanel/CreateCategory";
import CreateProduct from "./components/AdminPanel/CreateProduct";
import CreateDiscount from "./components/AdminPanel/CreateDiscount";
import CreateSpecification from "./components/AdminPanel/CreateSpecification"
import {UseFormControl} from "./components/Forms/UseFormControl";





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
            <Route path="*" element={<NotFound/>}/>
            <Route path="/adminPanel" element={<AdminPanel/>}/>

            <Route path="/allCategories" element={<AllCategories/>}/>
            <Route path="/allProducts" element={<AllProducts/>}/>
            <Route path="/allSpecifications" element={<AllSpecifications/>}/>
            <Route path="/allDiscounts" element={<AllDiscounts/>}/>
            <Route path="/allStock" element={<AllStock/>}/>

            <Route path="/adminCategories" element={<AdminCategories/>}/>
            <Route path="/adminProducts" element={<AdminProducts/>}/>
            <Route path="/adminSpecifications" element={<AdminSpecifications/>}/>
            <Route path="/adminDiscounts" element={<AdminDiscounts/>}/>
            <Route path="/adminStock" element={<AdminStock/>}/>

            <Route path="/createCategory" element={<CreateCategory/>}/>
            <Route path="/createProduct" element={<CreateProduct/>}/>
            <Route path="/createSpecification" element={<CreateSpecification/>}/>
            <Route path="/createDiscount" element={<CreateDiscount/>}/>
            
          </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
