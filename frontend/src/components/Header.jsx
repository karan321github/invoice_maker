import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">INVOICE Maker</h1>
        <div>
          <Link to='/login' className="bg-white text-black font-semibold py-2 px-4 rounded mr-2">
            Login
          </Link>
          <Link to='/signup' className="bg-white text-black font-semibold py-2 px-4 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
