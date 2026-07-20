import { AnimatePresence, motion } from "framer-motion";
import { Camera, Loader2, Save, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CLOUDINARY_TRANSFORMATIONS } from "../../constants/cloudinary/cloudinary.const";
import {
  getTransformedImageUrl,
  uploadImageToCloudinary,
} from "../../services/cloudinary.service";

type AvatarEditModalProps = {
  avatarUrl?: string | null;
  initials: string;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (avatarUrl: string) => void | Promise<void>;
};

const AvatarEditModal = ({
  avatarUrl,
  initials,
  isOpen,
  isSaving,
  onClose,
  onSave,
}: AvatarEditModalProps) => {
  const [nextAvatarUrl, setNextAvatarUrl] = useState(avatarUrl ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNextAvatarUrl(avatarUrl ?? "");
      setUploadError("");
    }
  }, [avatarUrl, isOpen]);

  const handleFileChange = async (file?: File) => {
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError("");
      const response = await uploadImageToCloudinary(file, {
        folder: "genefit/avatars",
        tags: ["genefit", "avatar"],
        maxSizeInMB: 5,
      });
      setNextAvatarUrl(
        getTransformedImageUrl(response.public_id, CLOUDINARY_TRANSFORMATIONS.avatar),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không thể upload ảnh.";
      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => {
            if (!isSaving && !isUploading) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                  <Camera size={24} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-primary dark:text-emerald-300">
                    Cập nhật avatar
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                    Ảnh đại diện
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving || isUploading}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-60 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-primary text-4xl font-black text-white shadow-lg ring-4 ring-primary/10">
                {nextAvatarUrl ? (
                  <img src={nextAvatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Upload ảnh mới lên Cloudinary, sau đó Genefit sẽ lưu URL ảnh vào hồ sơ của bạn.
              </p>
            </div>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-primary hover:bg-primary/5 dark:border-white/15 dark:bg-white/5 dark:hover:border-primary">
              {isUploading ? (
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
              ) : (
                <Upload className="h-7 w-7 text-primary dark:text-emerald-300" />
              )}
              <span className="mt-3 text-sm font-black text-slate-950 dark:text-white">
                {isUploading ? "Đang upload..." : "Chọn ảnh từ máy"}
              </span>
              <span className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                JPG, PNG, WebP hoặc GIF, tối đa 5MB
              </span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={isUploading || isSaving}
                onChange={(event) => void handleFileChange(event.target.files?.[0])}
              />
            </label>

            {uploadError && (
              <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200">
                {uploadError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving || isUploading}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => onSave(nextAvatarUrl)}
                disabled={isSaving || isUploading || !nextAvatarUrl}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-black text-white shadow-primary transition hover:bg-primary-hover disabled:opacity-70"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Lưu avatar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarEditModal;
