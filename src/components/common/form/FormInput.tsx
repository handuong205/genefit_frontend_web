import { useState, useEffect } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useImageUpload } from "../../../hooks/useImageUpload";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

// Ảnh mặc định khi không có avatar
const DEFAULT_AVATAR =
  "https://i.pinimg.com/736x/af/80/37/af80374611f4673d1928a881727e13b0.jpg";

interface FormInputProps {
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "file"
    | "tel"
    | "number"
    | "date"
    | "time"
    | "textarea";
  variant?: "avatar" | "file";
  register?: UseFormRegisterReturn; // Thay đổi: Đặt dấu ? để không bắt buộc (dùng cho isView)
  error?: FieldError | any;
  defaultValue?: string | number;
  placeholder?: string;
  isView?: boolean;
  className?: string;
  onUploadSuccess?: (url: string) => void;
  isDisabled?: boolean;
  setIsExternalLoading?: (loading: boolean) => void;
  uploadFolder?: string;
  step?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string | number; // Thêm prop value để có thể điều khiển từ bên ngoài
}

export const FormInput = ({
  label,
  type = "text",
  register,
  error,
  defaultValue,
  placeholder,
  isView,
  className = "",
  onUploadSuccess,
  isDisabled,
  setIsExternalLoading,
  uploadFolder = "",
  step,
  onChange,
  value,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultValue);
  const { uploadImage, isUploading } = useImageUpload();

  const formatDate = (dateStr?: string | number) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setPreviewUrl(defaultValue);
  }, [defaultValue]);

  // Xử lý upload file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setIsExternalLoading?.(true);
    try {
      const res = await uploadImage(file, { folder: uploadFolder });
      if (res?.secure_url) onUploadSuccess?.(res.secure_url);
    } finally {
      setIsExternalLoading?.(false);
    }
  };

  // -------------------------------------------------------------
  // RENDER TEXTAREA
  // -------------------------------------------------------------
  if (type === "textarea") {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="text-sm font-semibold text-gray-500 uppercase pb-2">
          {label}
        </label>
        
        {isView ? (
          <div className="py-2 min-h-30 bg-gray-50 rounded-xl px-4 border border-gray-100">
            <span className="text-base text-gray-700 whitespace-pre-wrap">
              {defaultValue || "Không có ghi chú"}
            </span>
          </div>
        ) : (
          <textarea
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...(register || {})} // Đảm bảo an toàn nếu không truyền register
            disabled={isDisabled}
            rows={5}
            onChange={onChange}
            className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all outline-none 
                        resize-y min-h-30 focus:ring-2 
                        ${error ? "border-red-500 focus:ring-red-200 bg-red-50/30" : "border-gray-200 focus:border-primary focus:ring-primary/20"} 
                        ${isDisabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
          />
        )}
        
        {/* Vùng giữ chỗ cho lỗi (Chống giật layout) */}
        <div className="min-h-5 mt-1">
            {error && <p className="text-red-500 text-xs font-medium">{error.message}</p>}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER DATE / TIME
  // -------------------------------------------------------------
  if (type === "date" || type === "time") {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="text-xs font-bold text-gray-500 uppercase pb-2">
          {label}
        </label>
        {isView ? (
          <div className="py-2 min-h-9.5">
            <span className="text-base font-semibold text-gray-700">
                {type === "date" ? formatDate(defaultValue) : defaultValue || "Không có"}
            </span>
          </div>
        ) : (
            <input
            type={type}
            defaultValue={type === "date" ? formatDate(defaultValue) : defaultValue}
            placeholder={placeholder}
            {...(register || {})}
            disabled={isDisabled}
            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm transition-all outline-none focus:ring-2 
                        ${error ? "border-red-500 focus:ring-red-200 bg-red-50/30" : "border-gray-200 focus:border-primary focus:ring-primary/20"} 
                        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />
        )}
        
        <div className="min-h-5 mt-1">
            {error && <p className="text-red-500 text-xs font-medium">{error.message}</p>}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER FILE (AVATAR)
  // -------------------------------------------------------------
  if (type === "file") {
    const inputId = `file-upload-${label?.replace(/\s+/g, "-").toLowerCase() || "default"}`;
    const previewFallback = uploadFolder === 'USER' ? DEFAULT_AVATAR : "";

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label className="text-[12px] font-semibold text-gray-600 uppercase">
            {label}
          </label>
        )}
        <div className="flex gap-6 items-start">
          {!isView && (
            <div className="text-center">
              <label
                htmlFor={inputId}
                className={`w-30 h-30 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg transition bg-gray-50 ${
                  isUploading || isDisabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:border-primary"
                }`}
              >
                <Camera className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">
                  {isUploading ? "Đang tải..." : "Chọn ảnh"}
                </span>
              </label>

              <input
                id={inputId}
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg,image/gif"
                onChange={handleFileChange}
                disabled={isDisabled || isUploading}
              />
            </div>
          )}

          <div className="relative group">
            <img
              src={String(previewUrl || defaultValue || previewFallback)}
              alt="avatar"
              className={`w-30 h-30 object-cover rounded-lg shadow border-2 border-white transition-all ${
                isUploading ? "brightness-50" : ""
              }`}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-5 mt-1">
            {error && <p className="text-red-500 text-xs font-medium">{error.message}</p>}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER TEXT / NUMBER / EMAIL / PASSWORD
  // -------------------------------------------------------------
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-semibold text-gray-500 uppercase pb-2">
        {label}
      </label>
      <div className="relative">
        {isView ? (
          <div className="py-2 min-h-9.5">
            <span className="text-base font-semibold text-gray-700">
              {type === "password" ? "••••••••" : defaultValue || "Không có"}
            </span>
          </div>
        ) : (
          <>
            <input
              type={type === "password" && showPassword ? "text" : type}
              defaultValue={defaultValue}
              placeholder={placeholder}
              {...(register || {})}
              disabled={isDisabled}
              value={value} // Sử dụng prop value để điều khiển từ bên ngoài
              onChange={onChange} // Gọi onChange khi giá trị thay đổi
              step={step}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-xl text-sm transition-all outline-none focus:ring-2 
                          ${error ? "border-red-500 focus:ring-red-200 bg-red-50/30" : "border-gray-200 focus:border-primary focus:ring-primary/20"} 
                          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </>
        )}
      </div>
      
      <div className="min-h-5 mt-1">
        {error && <p className="text-red-500 text-xs font-medium">{error.message}</p>}
      </div>
    </div>
  );
};