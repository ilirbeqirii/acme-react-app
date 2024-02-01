import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/use-auth";
import "./Menu.css";

function Menu() {
  const [user, isLoggedIn, logout] = useAuth();

  const pageTitle = "Acme Product Management";

  const logOut = async () => {
    await logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">{pageTitle}</a>

        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/welcome"
              style={({ isActive }) => ({
                color: isActive ? "rgb(58, 134, 196)" : "",
                fontWeight: isActive ? "600" : "",
              })}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/products"
              style={({ isActive }) => ({
                color: isActive ? "rgb(58, 134, 196)" : "",
                fontWeight: isActive ? "600" : "",
              })}
            >
              Product List
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav navbar-right">
          {isLoggedIn() ? (
            <li className="nav-item">
              <a className="nav-link">Welcome {user?.userName}</a>
            </li>
          ) : null}

          {!isLoggedIn() ? (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Log In
              </NavLink>
            </li>
          ) : null}

          {isLoggedIn() ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                onClick={() => logOut()}
                to="/welcome"
                style={({ isActive }) => ({
                  cursor: "pointer",
                  color: isActive ? "rgb(58, 134, 196)" : "",
                  fontWeight: isActive ? "600" : "",
                })}
              >
                Log Out
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
