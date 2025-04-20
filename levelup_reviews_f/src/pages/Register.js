import Header from "../components/Header";
import Footer from "../components/Footer";
import '../assets/ContentPane.css';
import '../assets/RegisterPanel.css';
import axios from "axios";

function Register() {
    const handleRegister = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            alert('All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format');
            return;
        }

        if (username.length > 12) {
            alert('Username must be 12 characters or fewer');
            return;
        }

        if (password.length > 50) {
            alert('Password must be 50 characters or fewer');
            return;
        }

        try {
            const response = await axios.post('/api/users/register', { username, email, password });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="register-page">
            <Header />
            <div className="content-pane register-container">
                <h1 className="register-title">Join LevelUp Reviews</h1>
                <form className="register-form">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" className="form-input" />

                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" className="form-input" />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" className="form-input" />

                    <button type="button" onClick={handleRegister} className="register-button">Register</button>
                </form>
                <p className="register-footer">
                    Already have an account? <a href="/login" className="login-link">Login here</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
