import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../assets/image.png";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // State to hold success or error messages
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/login", { username, password })
            .then((result) => {
                if (result.data === "success") {
                    setMessage("Login successful! Redirecting...");
                    setTimeout(() => navigate("/dashboard"), 1500); // Quick redirect
                } else {
                    setMessage(result.data); // Show error message
                }
            })
            .catch(() => {
                setMessage("Login failed! Please try again.");
            });
    };

    const googleAuth = () => {
        window.open("http://localhost:3001/auth/google", "_self");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-400">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>

                {message && (
                    <div
                        className={`mb-4 text-center font-medium p-2 rounded-lg ${
                            message.includes("successful") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700">
                        Don't have an account?{" "}
                        <Link to="/" className="text-blue-600 font-medium hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={googleAuth}
                        className="w-full flex justify-center items-center gap-2 p-3 border rounded-lg hover:bg-gray-100 transition-all "
                    >
                        <img src={img} 
                            alt="Google Logo" className="w-5 h-5" 
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
