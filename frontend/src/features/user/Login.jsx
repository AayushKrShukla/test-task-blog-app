// import { useAuth } from '../context/AuthContext';

import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canClick = [email, password].every(Boolean);

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center">
      <form className="p-4 border-4 w-72 gap-10 mt-10">
        <h1 className="text-2xl font-black text-center">Login</h1>
        <div>
          <label>
            Email:
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              id="password"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your password goes here"
              value={password}
              onChange={onChangePassword}
              required
            />
          </label>
        </div>

        <button
          type="button"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => login(email, password)}
          disabled={!canClick}
        >
          Login
        </button>
      </form>
      <div>
        <Link className="underline text-indigo-600" to={"/signup"}>Signup for a new account here</Link>
      </div>
    </div>
  );
};

export default Login;
