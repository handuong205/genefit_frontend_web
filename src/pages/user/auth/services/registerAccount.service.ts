import { axiosClient } from "../../../../api/axios.config";
import type { RegisterBody } from "../models/registerBody.model";


export const RegisterAccountService = async (body: RegisterBody) => {
    try{
        const res = await axiosClient.post("/api/users/register", body);
        if(res && res.status === 200){
            return res.data;
        }
        
    } catch (error) {
        console.error("Error registering account:", error);
        throw error;
    }
};
