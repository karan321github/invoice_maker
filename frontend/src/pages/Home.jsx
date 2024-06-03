import { Link } from "react-router-dom";
import { selectUser } from "../store/reducers/authReducers";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Invoice Maker</h1>
      <p className="text-lg mb-8">Create beautiful invoices in minutes</p>
      {user && user.isLoggedIn ? (
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
        >
          Add Products
        </Link>
      ) : (
        <p className="text-lg mb-8">
          Please{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            login
          </Link>{" "}
          to add products.
        </p>
      )}
    </div>
  );
};

export default Home;
