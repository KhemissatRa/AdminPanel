import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlemailChange = (e) => setEmail(e.target.value);
  const handlepassChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://backendoctoweb-1.onrender.com/admin/login", {
        email,
        password,
      });

      if (response.data.token) {
        axios.defaults.headers.common["x-auth-token"] = `${response.data.token}`;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.name);
        setMessage(response.data.message || "Login successful!");
        navigate("/orders");
       const token = localStorage.getItem("token")
        console.log(token)
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred during login");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center bg-slate-950 p-4 sm:p-6">
     <div className="pb-14 m-0">

</div>
     <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-10 transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-6">
          Admin Login
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={handlemailChange}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlepassChange}
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p className="text-red-500 text-sm text-center mt-2 break-words">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
