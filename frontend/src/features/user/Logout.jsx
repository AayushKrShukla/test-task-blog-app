// import { useAuth } from '../context/AuthContext';

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const Logout = () => {
  const { logout } = useAuth();
  logout();

  return (
    <div className="flex flex-col items-center mt-2">
      <p>Logged Out</p>
      <p>
        <Link className="underline text-indigo-600" to={"/login"}>
          Click here to login again
        </Link>
      </p>
    </div>
  );
};

export default Logout;
