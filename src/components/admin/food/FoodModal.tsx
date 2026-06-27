import { Apple, HeartPulse, InfoIcon } from "lucide-react";
import type { Food } from "../../../pages/admin/food/models/Food.model";
import { FormInput } from "../../common/form/FormInput";
import { useAppForm } from "../../../hooks/useAppForm";
import { useEffect, useMemo } from "react";
import type { UpdateFoodRequest } from "../../../pages/admin/food/models/UpdateFood.model";
import type { CreateFoodRequest } from "../../../pages/admin/food/models/CreateFood.model";

export type FoodModalProps = {
  mode: "create" | "edit" | "view";
  food?: Food | null;
  onSubmit: (data: any) => void ;
};

const FoodModal = (props: FoodModalProps) => {
  const DEFAULT_FORM_VALUES = useMemo(
    () => ({
      adminId: 1, //mock
      foodName: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      nutritionInfo: "",
      isPublic: true,
      approvalStatus: "PENDING",
      createdByUserId: 0,
    }),
    [],
  );

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useAppForm({
    defaultValues: props.food || DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    if (props.food) {
      reset(props.food);
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [props.food, reset, DEFAULT_FORM_VALUES]);

 const processFormData = (formData: any) => {
        if (!props.onSubmit) return;

        if (props.mode === "create") {
            // 1. Dữ liệu (Body) gửi đi khi TẠO MỚI
            const createBody: CreateFoodRequest = {
                adminId: 1, // Mock adminId, có thể thay bằng giá trị thực nếu cần
                foodName: formData.foodName,
                nutritionInfo: formData.nutritionInfo,
                calories: Number(formData.calories),
                protein: Number(formData.protein),
                carbs: Number(formData.carbs),
                fat: Number(formData.fat),
            };
            
            props.onSubmit(createBody);

        } else if (props.mode === "edit") {
            // 2. Dữ liệu (Body) gửi đi khi CẬP NHẬT
            const updateBody: UpdateFoodRequest = {
                foodName: formData.foodName,
                nutritionInfo: formData.nutritionInfo,
                calories: Number(formData.calories),
                protein: Number(formData.protein),
                carbs: Number(formData.carbs),
                fat: Number(formData.fat),
                isPublic: formData.isPublic,
            };
            
            props.onSubmit(updateBody);
        }
    };

  return (
    <form id="food-form" onSubmit={handleSubmit(processFormData)} className="p-4">
      
        {/* Nội dung Form */}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Cột trái: Thông tin cơ bản */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Apple className="w-7 h-7 text-primary" />
              <h3 className="text-xl font-semibold text-primary uppercase tracking-wide">
                Thông tin cơ bản
              </h3>
            </div>

            <div className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-50">
              <FormInput
                label="Tên món ăn"
                defaultValue={props.food?.foodName || ""}
                isDisabled={props.mode === "view"}
                register={register("foodName", {
                  required: "Tên món ăn không được để trống",
                  minLength: {
                    value: 3,
                    message: "Tên món phải có ít nhất 3 ký tự",
                  },
                })}
                error={errors.foodName}
              />

              <FormInput
                label="Thông tin mô tả"
                type="textarea"
                defaultValue={props.food?.nutritionInfo || ""}
                isDisabled={props.mode === "view"}
                register={register("nutritionInfo", {
                  required: "Thông tin mô tả không được để trống",
                })}
                error={errors.nutritionInfo}
              />
            </div>
          </div>

          {/* Đường phân cách dọc trên màn hình lớn */}
          <div className="hidden md:block w-px bg-gray-100"></div>

          {/* Cột phải: Giá trị dinh dưỡng */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-7 h-7 text-accent" />
              <h3 className="text-xl font-semibold text-accent uppercase tracking-wide">
                Giá trị dinh dưỡng
              </h3>
            </div>

            {/* Lưới 2x2 cho các chỉ số */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-50">
              <FormInput
                label="Calories (kcal)"
                type="number"
                defaultValue={props.food?.calories || ""}
                isDisabled={props.mode === "view"}
                register={register("calories", {
                  required: "Calories phải là số và không được để trống",
                  min: { value: 0, message: "Calories phải là số dương" },
                })}
                error={errors.calories}
              />
              <FormInput
                label="Protein (g)"
                type="number"
                defaultValue={props.food?.protein || ""}
                isDisabled={props.mode === "view"}
                register={register("protein", {
                  required: "Protein phải là số và không được để trống",
                  min: { value: 0, message: "Protein phải là số dương" },
                })}
                error={errors.protein}
              />
              <FormInput
                label="Carbs (g)"
                type="number"
                defaultValue={props.food?.carbs || ""}
                isDisabled={props.mode === "view"}
                register={register("carbs", {
                  required: "Carbs phải là số và không được để trống",
                  min: { value: 0, message: "Carbs phải là số dương" },
                })}
                error={errors.carbs}
              />
              <FormInput
                label="Chất béo (g)"
                type="number"
                defaultValue={props.food?.fat || ""}
                isDisabled={props.mode === "view"}
                register={register("fat", {
                  required: "Chất béo phải là số và không được để trống",
                  min: { value: 0, message: "Chất béo phải là số dương" },
                })}
                error={errors.fat}
              />
            </div>
          </div>
        </div>
        {props.mode === "view" && (
          <div className="mt-6 space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <InfoIcon className="w-7 h-7 text-text-secondary" />
              <h3 className="text-xl font-semibold text-text-secondary uppercase tracking-wide">
                Thông tin hệ thống
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col ">
                <label className="text-sm font-semibold text-gray-500 uppercase pb-2">
                  Trạng thái phê duyệt
                </label>
                <div>
                  {props.food?.approvalStatus === "PENDING" && (
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200">
                      <span className="text-sm font-medium text-yellow-600">
                        Đang chờ duyệt
                      </span>
                    </div>
                  )}
                  {props.food?.approvalStatus === "APPROVED" && (
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                      <span className="text-sm font-medium text-emerald-600">
                        Đã duyệt
                      </span>
                    </div>
                  )}
                  {props.food?.approvalStatus === "REJECTED" && (
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-50 border border-red-200">
                      <span className="text-sm font-medium text-red-600">
                        Từ chối
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col ">
                <label className="text-sm font-semibold text-gray-500 uppercase pb-2">
                  Chế độ hiển thị
                </label>
                <div>
                  {props.food?.isPublic ? (
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                      <span className="text-sm font-medium text-blue-600">
                        Công khai
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                      <span className="text-sm font-medium text-gray-600">
                        Ẩn / Nội bộ
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Người tạo (createdByUserId) */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">
                  Người tạo
                </label>
                <div className="py-1">
                  <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    ID: {props.food?.createdByUserId || "Không rõ"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
    </form>
  );
};

export default FoodModal;
