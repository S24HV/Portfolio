import MoonSvg from "../assets/moon.svg";
import SunSvg from "../assets/sun.svg";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTheme } from "../store/theme/theme";

import "./header.scss";

const Header = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(toggleTheme());

  return (
    <div className={`header-container ${theme}`}>
      <h1 className="header-title">N-EXIT</h1>
      <button
        className="change-theme-toggle"
        onClick={toggle}>
        {theme === "light" ? (
          <img
            className="theme-icon"
            src={MoonSvg}
          />
        ) : (
          <img
            className="theme-icon"
            src={SunSvg}
          />
        )}
      </button>
    </div>
  );
};

export default Header;
