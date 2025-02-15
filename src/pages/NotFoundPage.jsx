import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";


function NotFoundPage() {
    return (
        <>
            <h1>404 - Not Found</h1>
            <Link to="/"><BackButton /></Link>
        </>
    );
}

export default NotFoundPage;