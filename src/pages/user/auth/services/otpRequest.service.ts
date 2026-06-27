import { axiosClient } from "../../../../api/axios.config";

export const OtpRequestService = async (email: string) => {
    try{
        const res = await axiosClient.post("/api/users/send-otp", null, {
            params: {
                email: email
            }
        });
        if(res && res.status === 200){
            return res.data;
        }
        
    } catch (error) {
        console.error("Error requesting OTP:", error);
        throw error;
    }
};
