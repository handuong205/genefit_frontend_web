import { useCallback, useEffect, useState } from "react";
import type { Food } from "./models/Food.model";
import { CRUDPageTemplate, type Column } from "../../../components/template/CRUDTemplate";
import { searchFoodService } from "./services/searchFood.service";
import { CRUDModalTemplate } from "../../../components/template/CRUDModal";
import FoodModal from "../../../components/admin/food/FoodModal";
import { toast } from "react-toastify";
import { updateFoodService } from "./services/updateFood.service";
import { createFoodService } from "./services/createFood.service";
import { ActionConfirmModal } from "../../../components/template/ActionConfirmModal";
import { deleteFoodService } from "./services/deleteFood.service";
import { FormInput } from "../../../components/common/form/FormInput";
// import { FormInput } from "lucide-react";


const FoodsPage = () => {
    // const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [foods, setFoods] = useState<Food[] | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit" | "view">(
        "create",
    );
    const [selectedItem, setSelectedItem] = useState<Food | null>(null,);
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [currentFilters, setCurrentFilters] = useState<any>({});


    const fetchFoods = useCallback(async (
        pageNum = 1, 
        type: "full" | "table" = "full", 
        size = pageSize,
        // searchParams?: { searchTerm?: string; filters?: any; formData?: any },
    ) => {
        try {
            
            if (type === "full") setIsLoading(true);
            if (type === "table") setIsTableLoading(true);
            const response = await searchFoodService({
                searchCondition: {
                    keyword:  "",
                    isDeleted: "false",
                    isPublic: "true",
                },
                pageInfo: {
                    pageNum,
                    pageSize: size,
                }
            });

            if (response) {
                setFoods(response.content);
                setTotalItems(response.pageInfo?.totalItem); 
                setPage(response.pageInfo?.pageNum || 1);
                setPageSize(response.pageInfo?.pageSize || 10);

            }
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setIsLoading(false);
            setIsTableLoading(false);
        }
    
    }, [pageSize]);

    
    useEffect(() => {
        fetchFoods(1, "full");
    }, [ fetchFoods]);

    const columns: Column<Food>[] = [
        {
            header: "Tên món ăn",
            accessor: "foodName",
            sortable: true,
            className: 'text-center',
        },
        {
            header: "Tạo bởi",
            accessor: "createdByUserId",
            className: 'text-center',
        },
        {
            header : "Lượng calo (kcal)",
            accessor: "calories",
            sortable: true,
            className: 'text-center',
        },
        {
            header: "Công khai",
            accessor: "isPublic",
            className: 'flex justify-center text-center',
            render(item) {
                return ( 
                 <div className="text-center">
                   {item.isPublic ? <span className="text-green-500">Có</span> : <span className="text-red-500">Không</span>}
                 </div>
                )
            },
        },
        {
            header: "Trạng thái",
            accessor: "approvalStatus",
            className: 'text-center',
            render(item) {
                switch (item.approvalStatus) {
                  case "PENDING":
                    return (
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200">
                        <span className="text-sm font-medium text-yellow-500">
                          Đang chờ duyệt
                        </span>
                      </div>
                    );
                  case "APPROVED":
                    return (
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-100 border border-green-200">
                        <span className="text-sm font-medium text-green-500">
                          Đã duyệt
                        </span>
                      </div>
                    );
                  case "REJECTED":
                    return (
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-100 border border-red-200">
                        <span className="text-sm font-medium text-red-500">
                          Bị từ chối
                        </span>
                      </div>
                    );
                  default:
                    return item.approvalStatus;
                }
            },
        }
    ]

    const handleFormSubmit = async (formData: any) => {
        setIsTableLoading(true);
        try {
            if (formMode === "create") {
                const res = await createFoodService(formData);
                if (res) {
                    console.log(res);
                    toast.success("Tạo món ăn thành công!");
                }
            } else if (formMode === "edit" && selectedItem?.foodId) {
                const res = await updateFoodService(selectedItem.foodId, formData);
                if (res) {
                    console.log(res);
                    toast.success("Cập nhật món ăn thành công!");
                }
            }
            
            setIsFormOpen(false);
            fetchFoods(page, "table");
        } catch (error) {
            console.error("Lỗi khi lưu món ăn:", error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setIsTableLoading(false);
        }
    };

    
    const handleSearch = async (searchTerm?: string, filters?: any, searchData?: any) => {
        
        try{
            console.log(filters);
            setIsTableLoading(true);
            const response = await searchFoodService({
                searchCondition: {
                    keyword: searchTerm ,
                    isDeleted: 
                        filters.isDeleted === "true" ? true :
                        filters.isDeleted === "false" ? false : "",
                    isPublic: filters.isPublic === "true" ? true : filters.isPublic === "false" ? false : "",
                   calories: searchData?.calories? Number(searchData.calories) : undefined,
                    caloriesFrom: filters.caloriesFrom ? Number(filters.caloriesFrom) : undefined,
                    caloriesTo: filters.caloriesTo ? Number(filters.caloriesTo) : undefined,
                    proteinFrom: filters.proteinFrom ? Number(filters.proteinFrom) : undefined,
                    proteinTo: filters.proteinTo ? Number(filters.proteinTo) : undefined,
                    carbsFrom: filters.carbsFrom ? Number(filters.carbsFrom) : undefined,
                    carbsTo: filters.carbsTo ? Number(filters.carbsTo) : undefined,
                    fatFrom: filters.fatFrom ? Number(filters.fatFrom) : undefined,
                    fatTo: filters.fatTo ? Number(filters.fatTo) : undefined,

                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: pageSize,
                },
            });
            if(response){
                setFoods(response.content);
                setTotalItems(response.pageInfo?.totalItem); 
                setPage(response.pageInfo?.pageNum || 1);
                setPageSize(response.pageInfo?.pageSize || 10);
            }
           
        } catch (error) {
            console.error("Lỗi khi tìm kiếm món ăn:", error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setIsTableLoading(false);
        }
    };

    const handleDeleteOpen = (item: Food) => {
        setSelectedItem(item);
        setIsDeleteOpen(true);
    }

    const handleDeleteConfirm = async () => {
        if(!selectedItem) return;
        try{
            setIsTableLoading(true);
            await deleteFoodService(selectedItem.foodId);
            toast.success("Xóa món ăn thành công!");
            setIsDeleteOpen(false);
            fetchFoods(page, "table");
        } catch (error) {
            console.error("Lỗi khi xóa món ăn:", error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        }finally{
            setIsTableLoading(false);
        }
    }
  
  return (
    <>
      <CRUDPageTemplate<Food>
        title="Quản lý món ăn"
        rowKey="foodId"
        columns={columns}
        data={foods || []}
        isTableLoading={isTableLoading}
        onSearch={handleSearch}
        pageSize={pageSize}
        totalItems={totalItems}
        currentPage={page}
        onPageChange={(nextPage) => fetchFoods(nextPage, "table")}
        onPageSizeChange={(size) => {
          setPageSize(size);
          fetchFoods(1, "full", size);
        }}
        // tableMaxHeightClass="max-h-[80vh]"
        onAdd={() => {
          setFormMode("create");
          setSelectedItem(null);
          setIsFormOpen(true);
        }}
        onEdit={(item) => {
          setFormMode("edit");
          setSelectedItem(item);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteOpen}
        // onStatusChange={(item) => console.log("Change status", item)}
        onRestore={(item) => console.log("Restore item", item)}
        onView={(item) => {
          setFormMode("view");
          setSelectedItem(item);
          setIsFormOpen(true);
        }}
        onRefresh={() => fetchFoods(1, "full")}
        statusField="approvalStatus"
        filters={[
          {
            key: "isPublic",
            label: "Công khai",
            defaultValue: "true",
            options: [
              { value: "true", label: "Công khai" },
              { value: "false", label: "Không công khai" },
            ],
          },
          {
              key: "isDeleted",
              label: "Trạng thái xóa",
              options:[
                  {value: "false", label: "Đang sử dụng"},
                  {value: "true", label: "Đã xóa"},
              ],
          },
        ]}
        searchContent={(searchData, setSearchData) => (
          <div className="flex gap-4 flex-wrap">
            <FormInput
              label="Calo"
              type="number"
              value={searchData.calories || ""}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  calories: e.target.value,
                }))
              }
            />
          </div>
        )}
      ></CRUDPageTemplate>

      {isFormOpen && (
        <CRUDModalTemplate
          title="món ăn"
          onClose={() => setIsFormOpen(false)}
          isOpen={isFormOpen}
          maxWidth="max-w-1/2"
          mode={formMode}
          formId="food-form"
          // isLoading={isLoading}
          children={
            <FoodModal
              mode={formMode}
              food={selectedItem}
              onSubmit={handleFormSubmit}
            />
          }
        />
      )}
      {isDeleteOpen && selectedItem && (
        <ActionConfirmModal
          title="món ăn"
          onClose={() => setIsDeleteOpen(false)}
          isOpen={isDeleteOpen}
          onConfirm={handleDeleteConfirm}
          type="delete"
          message="Bạn có muốn xóa món ăn này không?"
          isLoading={false}
          // formId="food-form"
        />
      )}
    </>
  );
}


export default FoodsPage