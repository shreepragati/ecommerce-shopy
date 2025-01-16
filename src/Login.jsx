import { useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
  useEffect(() => {
    const getuserinfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user", {
          withCredentials: true,
        });
        console.log(response.data.principal.fullName);
        console.log(response.data.principal.email);
        if (response.data.principal) {
          window.location.href = "http://localhost:5173/dashboard";
        }
      } catch (e) {
        console.log("user info error: ", e);
      }
    };
    getuserinfo();
  }, []);
  const handleGoogleLogin = () => {
    // Add your Google login logic here
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome back to ShopEasy
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Login to continue using your account
        </p>
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white border border-gray-300 shadow-sm rounded-md py-2 px-4 hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="h-5 w-5 mr-2"
            />
            <span className="text-gray-700 font-medium">Login with Google</span>
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default LoginPage;