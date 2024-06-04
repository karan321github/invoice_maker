import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  selectIsLoggedIn,
  selectUser,
} from "../store/reducers/authReducers";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [logoutFeedback, setLogoutFeedback] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setLogoutFeedback("You have been logged out!");
  };

  setTimeout(() => {
    setLogoutFeedback("");
  }, 2000);
  return (
    <>
      <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">INVOICE Maker</h1>
          </Link>
          <div className="flex justify-evenly align-center">
            {isLoggedIn ? (
              <>
                <span className="mr-4 ml-4">Welcome, {user?.name}</span>
                <span>
                  <img
                    className="rounded-full w-10 h-10 mr-4"
                    src={user.pic}
                    alt="user pic"
                  />
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-black font-semibold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-black font-semibold py-2 px-4 rounded mr-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-black font-semibold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {logoutFeedback && (
        <div className="text-center text-black mt-2">{logoutFeedback}</div>
      )}
    </>
  );
};

export default Header;
