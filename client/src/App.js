import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detail } from "./components/Detail/Detail";
import { Home } from "./components/Home";
import {NavBar} from "./components/NavBar/NavBar";
import { NotFound } from "./components/NotFound/NotFound";
import { About } from "./components/About/About";
import { Login } from "./components/Login/Login";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";

import { UseFormControl} from "./components/Forms/UseFormControl"



import { ForgotPassword } from "./components/Login/ForgotPassword";


function App() {
  return (
    <BrowserRouter>

        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name" element={<Home />} />
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/createaccount" element={<CreateAccount/>}/>
            <Route path="/forgotpassword" element ={<ForgotPassword/>}/>
            <Route path="/createProduct" element={<UseFormControl/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>

    </BrowserRouter>

  );
}

export default App;
