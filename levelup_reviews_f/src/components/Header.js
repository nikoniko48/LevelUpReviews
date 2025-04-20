import '../assets/Header.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp > Date.now() / 1000) {
                    console.log(decoded);
                    setIsLoggedIn(true);
                    setIsAdmin(decoded.rola === "admin");
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
            }
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        alert("Logged out successfully!");
        navigate("/");
    };

    return (
        <div className="header">
            <div className="left-div">
                <img src={require('../assets/logoLVLUP2.png')} alt="logo" />
                <Link to="/" className="button">HOME</Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="button">Logout</button>
                ) : (
                    <Link to="/login" className="button">Login</Link>
                )}
                <Link to="/register" className="button">Register</Link>
            </div>
            <div className="right-div">
                {isLoggedIn ? (
                    <Link to="/profile" className="button">Profile</Link>
                ) : (
                    <Link to="/login" className="button">Profile</Link>
                )}
                {isAdmin ? (
                    <Link to="/addGame" className="button">Add Game</Link>
                ) : (
                    <></>
                )}
                <Link to="/" className="button">Browse</Link>
            </div>
        </div>
    );
}

export default Header;
