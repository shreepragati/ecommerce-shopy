import { useEffect, useState } from "react"
import axios from "axios"

function ShopPage() {
    const [loading, setLoading ] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/user", {
                    withCredentials: true,
                });
                console.log(response.data.principal.fullName);
                console.log(response.data.principal.email);
                if (!response.data.principal) {
                    window.location.href = "http://localhost:5173/login";
                }
            } catch (e) {
                console.log("user info error: ", e);
                setLoading(false);
                window.location.href = "http://localhost:5173/login";
            }
        }
        fetchUserInfo();

        setLoading(false)
    }, []);


    if (loading) {
        return (
          <div className="flex justify-center items-center w-full min-h-screen text-3xl">
            <div className="flex flex-col items-center">
              {/* Spinner */}
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75 border-solid"></div>
              {/* Loading Text */}
              <span className="mt-4">Loading...</span>
            </div>
          </div>
        );
      }
      

  return (
    <div>
        Shop
    </div>
  )
}

export default ShopPage
