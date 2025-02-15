import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
    return (
        <nav >
            <NavLink className={styles.navLink} to="/" >Home</NavLink>
            <NavLink className={styles.navLink} to="/movies" >Movies</NavLink>
        </nav>
    );
}

export default Navigation;