import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Service } from "./pages/Service";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer";
import { Logout } from "./pages/Logout";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminPage } from "./pages/Admin";
import { NewPolicy } from "./pages/newPolicy";
const App=()=>{
  return(
    <>
      <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path="/newPolicy" element={<NewPolicy/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
};





export default App