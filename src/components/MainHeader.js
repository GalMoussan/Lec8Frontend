import { NavLink } from "react-router-dom";

const MainHeader = () => {
    return (
        <header className="card">
            <nav>
                <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/signup"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/other"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >Other</NavLink>
                    </li>

                </ul>
            </nav>

        </header>
    )
}

export default MainHeader