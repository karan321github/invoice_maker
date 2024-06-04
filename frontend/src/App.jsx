import { Route, Routes } from "react-router-dom";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateProductPage from "./pages/CreateProductPage";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<CreateProductPage />} />
      </Routes>
    </>
  );
};

export default App;
