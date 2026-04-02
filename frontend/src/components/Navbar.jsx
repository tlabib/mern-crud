import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-sm font-bold text-gray-800 tracking-tight">
          Tasks CRUD App
        </Link>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/tasks"
                className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Tasks
              </Link>
              <Link
                to="/profile"
                className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1.5 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-medium ml-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-xs px-3 py-1.5 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium ml-1"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;