import { useNavigate, useSearchParams } from "react-router-dom";
import { PUBLIC_ROUTE } from "../constants/routes/public.route";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Lấy giá trị của 'token' từ URL
  const token = searchParams.get("token");
  
  console.log("Token lấy được:", token);

  const handleToken = async (token: string) => {
    if(!token) return
    navigate(PUBLIC_ROUTE.HOME)
  }

  useEffect(() => {
    if (token) {
      handleToken(token);
    }}, [token]);

  return (
     <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Verify;