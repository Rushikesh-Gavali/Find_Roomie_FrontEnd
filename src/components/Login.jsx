
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, clearToken, selectIsLoggedIn, setToken } from '../features/authSlice';
import Listings from './Listings';

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // console.log('Inside useEffect');
    const storedToken = localStorage.getItem('authToken');
    // console.log('Stored Token:', storedToken);
    if (storedToken) {
      // console.log('Stored Token:', storedToken);
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(loginAsync(email, password));
    if (user) {
      dispatch(setToken(user.token));
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome {isLoggedIn.id}</h1>
        <Listings />
        <button
  onClick={handleLogout}
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
>
  Logout
</button>

      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96 h-[350px]">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 mb-6" />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 mb-6" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
