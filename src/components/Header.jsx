import { NavLink } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/authSlice';

const Header = () => {
const isLoggedIn=useSelector(selectIsLoggedIn);
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto">
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-teal-200 text-lg" : "text-gray-300"} lg:hover:bg-transparent lg:border-0 hover:text-teal-200 lg:p-0`
                                  }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-teal-200 text-lg" : "text-gray-300"} lg:hover:bg-transparent lg:border-0 hover:text-teal-200 lg:p-0`
                                  }>
              {isLoggedIn ? "My Profile" : "Login"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={({isActive}) =>
                                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${isActive ? "text-teal-200 text-lg" : "text-gray-300"} lg:hover:bg-transparent lg:border-0 hover:text-teal-200 lg:p-0`
                                  }>
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
