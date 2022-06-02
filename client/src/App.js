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
import CreateSpecification from "./components/AdminPanel/CreateSpecification";
import { CheckOutForm } from "./components/StripeComponent/CheckOutForm";
import UsersPanel from "./components/AdminPanel/UserPanel/UsersPanel.jsx";
import Orders from "./components/AdminPanel/Orders";
import { Perfil } from "./components/PerfilUser/Perfil";
import CartView from "./components/Cart/CartView";
import { AskPanel } from "./components/AdminPanel/AskPanel";
import { VerHilo } from "./components/AdminPanel/VerHilo";
import CartModal from "./components/Cart/CartModal";
import { Banner } from "./components/AdminPanel/Banner";
import AdminBanner from "./components/AdminPanel/AdminBanner";
import GetMyDate from "./components/UserPanel/Get/GetMyDate";
import GetMyData from "./components/UserPanel/Get/GetMyDate";
import UserPanel from "./components/UserPanel/UserPanel";
import { UploadData } from "./components/UserPanel/Get/UploadData";
import { UploadPasswUser } from "./components/UserPanel/Get/UploadPasswUser";
import { UploadDataG } from "./components/UserPanel/Get/UploadDataG";
import { UploadPasswUserG } from "./components/UserPanel/Get/UploadPasswUserG";
import { MisPreguntas } from "./components/UserPanel/Get/Questions/MisPreguntas";
import QuestionPanel from "./components/UserPanel/QuestionPanel";
import UserUploadPasw from "./components/UserPanel/UserUploadPasw";
import UserUploadPaswG from "./components/UserPanel/UserUploadPaswG";
import UserUploadData from "./components/UserPanel/UserUploadData";
import UserUpdateDataG from "./components/UserPanel/UserUpdateDataG";
import MyDataAdmin from "./components/AdminPanel/PerfilAdmin/MyDataAdmin";
import { UpdataDataAdminG } from "./components/AdminPanel/PerfilAdmin/UpdataDataAdminG";
import UpdatePasswAdm from "./components/AdminPanel/PerfilAdmin/panel/UpdatePasswAdm";
import UpdatePasswAdmG from "./components/AdminPanel/PerfilAdmin/panel/UpdatePasswAdmG";
import UpdateDataAdm from "./components/AdminPanel/PerfilAdmin/panel/UpdateDataAdm";
import MyDataAdm from "./components/AdminPanel/PerfilAdmin/panel/MyDataAdm";
import { OrderDetails } from "./components/OrderDetails";
import UpdateDataAdmG from "./components/AdminPanel/PerfilAdmin/panel/UpdateDataAdmG";





function App() {
  return (
    
    <BrowserRouter >
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/:name" element={<Home />} />
            <Route exact path ="/checkout" element={<CheckOutForm/>} />
            <Route path="order/:id" element={<OrderDetails/>} />
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


            <Route path="/usersPanel" element={<UsersPanel/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/askPanel" element={<AskPanel/>}/>
            <Route path="/banner" element={<AdminBanner/>}/>


            <Route path="/cart" element={<CartView/>}/>
              
            <Route path="/userProfile" element={<UserPanel/>}/>
            <Route path="/myData" element={<UserPanel/>}/>
            <Route path="/updateUser" element={<UserUploadData/>}/>
            <Route path="/updateUserG" element={<UserUpdateDataG/>}/>
            <Route path="/updatePasswUser" element={<UserUploadPasw/>}/>
            <Route path="/updatePasswUserG" element={<UserUploadPaswG/>}/>
            <Route path="/allQuestions" element={<QuestionPanel/>}/>

            <Route path="/myDataAdm" element={< MyDataAdm/>}/>
            <Route path="/updateAdmin" element={<UpdateDataAdm/>}/>
            <Route path="/updateAdminG" element={<UpdateDataAdmG/>}/>
            <Route path="/updatePasswAdmin" element={<UpdatePasswAdm/>}/>
            <Route path="/updatePasswAdminG" element={<UpdatePasswAdmG/>}/>

            {/* <Route path="askPanel/prueba2/:user/:prod/:preg" element={<VerHilo/>}/> */}

            <Route path="/prueba" element={<CartModal/>}/>

          </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
