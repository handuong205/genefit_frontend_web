// hooks/useAppForm.ts
import { useForm, type UseFormProps,  } from "react-hook-form";

// Hook này bọc useForm lại và mặc định bật sẵn tính năng bắt lỗi khi nhập
export const useAppForm = <T extends Record<string, any>>(options?: UseFormProps<T>) => {
    return useForm<T>({
        mode: "onChange", 
        ...options,
    });
};