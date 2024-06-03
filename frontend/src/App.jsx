import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Products from "./pages/Products";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
