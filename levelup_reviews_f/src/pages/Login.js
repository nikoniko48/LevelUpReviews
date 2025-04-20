import Header from "../components/Header";
import Footer from "../components/Footer";
import '../assets/ContentPane.css';
import '../assets/LoginPanel.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('/api/users/login', { username, password });
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
            console.log('Token stored:', localStorage.getItem('token'));
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <Header />
            <div className="content-pane login-container">
                <h1 className="login-title">Welcome Back to LevelUp Reviews</h1>
                <form className="login-form">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" className="form-input" />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" className="form-input" />

                    <button type="button" onClick={handleLogin} className="login-button">Login</button>
                </form>
                <p className="login-footer">
                    Don't have an account? <a href="/register" className="register-link">Register here</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
