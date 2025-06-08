import { NavLink, useLocation } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import styles from "./Navigation.module.css";

function Navigation() {
  const location = useLocation();

  const isOnMovieDetailsPage = /^\/movies\/\d+$/.test(location.pathname);

  return (
    <div className="mainContent">
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <NavLink className={styles.navLink} to="/">
            Home🏠
          </NavLink>
          <NavLink className={styles.navLink} to="/movies">
            Movies🎬
          </NavLink>
        </div>
        {isOnMovieDetailsPage && (
          <div className={styles.backButtonWrapper}>
            <BackButton />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
