import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toggle from "../../../components/common/form/Toggle";
import {
  CRUDPageTemplate,
  type Column,
} from "../../../components/template/CRUDTemplate";
import { CRUDModalTemplate } from "../../../components/template/CRUDModal";
import { ActionConfirmModal } from "../../../components/template/ActionConfirmModal";
import SubscriptionModal, {
} from "../../../components/admin/subscription/SubscriptionModal";
import type { SubscriptionPlan } from "./models/searchSubscription.model";
import type { UpdatePlanRequest } from "./models/updateSubscription.model";
import { searchPlanService } from "./services/searchSubscription.service";
import { createPlanService } from "./services/createSubscription.service";
import { updatePlanService } from "./services/updateSubscription.service";
import { deletePlanService } from "./services/deleteSubscription.service";
import { BOOLEAN_FIELDS } from "../../../constants/subscription/subscription.constants";
import { toPlanRequest } from "../../../utils/subscription/subscription.utils";

type FormMode = "create" | "edit" | "view";

const SubscriptionPage = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [plans, setPlans] = useState<SubscriptionPlan[] | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedItem, setSelectedItem] = useState<SubscriptionPlan | null>(
    null,
  );

  const fetchPlans = useCallback(
    async (pageNum = 1, type: "full" | "table" = "full", size = pageSize) => {
      try {
        if (type === "full") setIsTableLoading(true);
        if (type === "table") setIsTableLoading(true);
        const response = await searchPlanService({
          keyword: "",
          pageInfo: {
            pageNum,
            pageSize: size,
          },
        });

        if (response) {
          setPlans(response.content);
          setTotalItems(response.pageInfo?.totalItem);
          setPage(response.pageInfo?.pageNum || 1);
          setPageSize(response.pageInfo?.pageSize || 10);
        }
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      } finally {
        setIsTableLoading(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    fetchPlans(1, "full");
  }, [fetchPlans]);

  const handleToggleActive = async (item: SubscriptionPlan) => {
    try {
      setIsTableLoading(true);
      await updatePlanService(item.planId, {
        ...toPlanRequest(item),
        active: !item.active,
      });
      toast.success("Cập nhật trạng thái thành công!");
      fetchPlans(page, "table");
    } catch (error) {
      console.error("Error updating subscription status:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsTableLoading(false);
    }
  };

  const columns: Column<SubscriptionPlan>[] = [
    {
      header: "Tên gói",
      accessor: "planName",
      sortable: true,
      className: "text-center",
    },
    {
      header: "Loại ",
      accessor: "planType",
      className: "text-center",
    },
    {
      header: "Giá",
      accessor: "price",
      className: "text-center",
      render(item) {
        return (
          <span className="font-medium text-gray-700">
            {Number(item.price).toLocaleString("vi-VN")} d
          </span>
        );
      },
    },
    {
      header: "Thời hạn",
      accessor: "durationDays",
      className: "text-center",
      render(item) {
        return <span>{item.durationDays} ngày</span>;
      },
    },
    {
      header: "AI Scan",
      accessor: "aiScanLimitPerMonth",
      className: "text-center",
      render(item) {
        return <span>{item.aiScanLimitPerMonth}/tháng</span>;
      },
    },
    {
      header: "Trạng thái",
      accessor: "active",
      className: "flex items-center justify-center",
      render(item) {
        return (
          <div className="flex items-center justify-center">
            <Toggle
              checked={item.active}
              onChange={() => handleToggleActive(item)}
              size="md"
            />
          </div>
        );
      },
    },
  ];

  const handleFormSubmit = async (formData: UpdatePlanRequest) => {
    setIsTableLoading(true);
    try {
      if (formMode === "create") {
        const createBody = BOOLEAN_FIELDS.reduce(
          (body, field) => ({
            ...body,
            [field]: Boolean(formData[field] ?? false),
          }),
          { ...formData } as UpdatePlanRequest,
        );

        const res = await createPlanService(createBody);
        if (res) {
          toast.success("Tao goi dang ky thanh cong!");
        }
      } else if (formMode === "edit" && selectedItem?.planId) {
        const res = await updatePlanService(selectedItem.planId, formData);
        if (res) {
          toast.success("Cap nhat goi dang ky thanh cong!");
        }
      }

      setIsFormOpen(false);
      fetchPlans(page, "table");
    } catch (error) {
      console.error("Error saving subscription plan:", error);
      toast.error("Co loi xay ra, vui long thu lai.");
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleSearch = async (searchTerm?: string) => {
    try {
      setIsTableLoading(true);
      const response = await searchPlanService({
        keyword: searchTerm || "",
        pageInfo: {
          pageNum: 1,
          pageSize,
        },
      });

      if (response) {
        setPlans(response.content);
        setTotalItems(response.pageInfo?.totalItem);
        setPage(response.pageInfo?.pageNum || 1);
        setPageSize(response.pageInfo?.pageSize || 10);
      }
    } catch (error) {
      console.error("Error searching subscription plans:", error);
      toast.error("Co loi xay ra, vui long thu lai.");
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleDeleteOpen = (item: SubscriptionPlan) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;

    try {
      setIsTableLoading(true);
      await deletePlanService(selectedItem.planId);
      toast.success("Xoa goi dang ky thanh cong!");
      setIsDeleteOpen(false);
      fetchPlans(page, "table");
    } catch (error) {
      console.error("Error deleting subscription plan:", error);
      toast.error("Co loi xay ra, vui long thu lai.");
    } finally {
      setIsTableLoading(false);
    }
  };

  return (
    <>
      <CRUDPageTemplate<SubscriptionPlan>
        title="Quản lý gói đăng ký"
        rowKey="planId"
        columns={columns}
        data={plans || []}
        isTableLoading={isTableLoading}
        onSearch={handleSearch}
        pageSize={pageSize}
        totalItems={totalItems}
        currentPage={page}
        onPageChange={(nextPage) => fetchPlans(nextPage, "table")}
        onPageSizeChange={(size) => {
          setPageSize(size);
          fetchPlans(1, "full", size);
        }}
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
        onView={(item) => {
          setFormMode("view");
          setSelectedItem(item);
          setIsFormOpen(true);
        }}
      />

      {isFormOpen && (
        <CRUDModalTemplate
          title="gói đăng ký"
          onClose={() => setIsFormOpen(false)}
          isOpen={isFormOpen}
          maxWidth="max-w-5xl"
          mode={formMode}
          formId="subscription-form"
        >
          <SubscriptionModal
            mode={formMode}
            plan={selectedItem}
            onSubmit={handleFormSubmit}
          />
        </CRUDModalTemplate>
      )}

      {isDeleteOpen && selectedItem && (
        <ActionConfirmModal
          title="gói đăng ký"
          onClose={() => setIsDeleteOpen(false)}
          isOpen={isDeleteOpen}
          onConfirm={handleDeleteConfirm}
          type="delete"
          message="Bạn có chắc chắn muốn xóa gói đăng ký này không?"
          isLoading={false}
        />
      )}
    </>
  );
};

export default SubscriptionPage;
