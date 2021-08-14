import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutBtnPressed } from "../user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const login = useSelector(state=>state.user.loginStatus)
  return (
    <div>
      <nav className="navigation">
        <div className="nav-brand">
          <NavLink to="/" className="link">
            The Workout Zone
          </NavLink>
        </div>

        <ul className="list-non-bullet nav-pills">
          <li className="list-item-inline">
            <NavLink to="/likedvideos" className="link link-active">
              Liked Videos
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/watchlater" className="link link-active">
              Watch Later
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/history" className="link link-active">
              History
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/login" className="link link-active">
             { login ?  
             <button
              className="btn btn-outline btn-no-hover btn-header"
              onClick={() => dispatch(logoutBtnPressed())}
            > Logout  </button> 
            : "Login" }
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
