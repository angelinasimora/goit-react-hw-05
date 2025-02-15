import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import styles from "./BackButton.module.css";

function Button() {
    const location = useLocation();
    const navigate = useNavigate();


    const backLink = useRef(location.state ?.from ?? "/movies");


    const handleGoBack = () => {
        navigate(backLink.current);
    };

    return (
        <button className={styles.backButton} onClick={handleGoBack}>
            Go Back
        </button>
    );
}

export default Button;