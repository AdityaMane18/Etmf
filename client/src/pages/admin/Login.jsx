import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CapsuleImage from '../../assets/Capsule.jpeg';
import LogoImage from '../../assets/Loginlogo.jpg';
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = response.data;
  
      // Save to localStorage (optional)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      toast.success("Login successful!");
      // Redirect to admin dashboard or protected route
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "student") {
        navigate("/student/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-100">
        <img src={CapsuleImage} alt="Medical Molecule" className="h-full w-full object-cover" />
      </div>

      {/* Right Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-gray-50">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <img src={LogoImage} alt="Logo" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-cyan-600">Login</h2>
          </div>

          <h2 className="text-xl font-bold text-center text-gray-800 mb-6 border-b-2 pb-1">
            Login your account!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
            />

            <div className="flex justify-end">
              <a href="#" className="text-sm text-black hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
            >
              Continue
            </button>

            <div className="text-center text-gray-500">Sign in With</div>

            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center justify-center border px-4 py-2 rounded-md shadow-sm hover:bg-gray-100"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="h-5 mr-2"
                />
                Google
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
   
    
export default Login;
