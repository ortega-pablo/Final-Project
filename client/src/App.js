import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detail } from "./components/Detail/Detail";
import { Home } from "./components/Home";
<<<<<<< HEAD
import {NavBar} from "./components/NavBar/NavBar";
=======
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/NavBar/NavBar";
>>>>>>> 735a80ce980f60b29536f302b4d16d4add36cf39
import { NotFound } from "./components/NotFound/NotFound";
import { About } from "./components/About/About";
import { Login } from "./components/Login/Login";
import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { ForgotPassword } from "./components/Login/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
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
          </Routes>
=======
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
>>>>>>> 735a80ce980f60b29536f302b4d16d4add36cf39
    </BrowserRouter>
  );
}

export default App;
