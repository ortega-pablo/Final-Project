import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Detail } from "./components/Detail/Detail";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer/Footer";
import {NavBar} from "./components/NavBar/NavBar";
import { NotFound } from "./components/NotFound/NotFound";


function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
        <Footer/>
    </BrowserRouter>

  );
}

export default App;
