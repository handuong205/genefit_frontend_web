import { useEffect, useState } from "react";
import { getDashboardDataService } from "./services/getDashboardData.service";
import type { DashboardResponse } from "./models/Dashboard.model";

const DashboardPage = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [viewDate, setViewDate] = useState(new Date());

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDashboardDataService();
        if (res) {
          setData(res);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const emptyDays = firstDay === 0 ? 6 : firstDay - 1; // Monday as first day

    const days = [];
    for (let i = 0; i < emptyDays; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = customDate === dateStr;
      
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const isToday = todayStr === dateStr;
      
      days.push(
        <button
          key={d}
          onClick={() => setCustomDate(dateStr)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer transition-colors ${
            isSelected 
              ? "bg-primary text-white font-bold shadow-md" 
              : isToday 
                ? "bg-primary/10 text-primary font-bold hover:bg-primary/20"
                : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const formatNumber = (num: number) => new Intl.NumberFormat("vi-VN").format(num);
  
  const formatCurrencyVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  
  const formatTrend = (trend: number) => {
    if (trend > 0) return `+${trend.toFixed(1)}%`;
    if (trend < 0) return `${trend.toFixed(1)}%`;
    return "0%";
  };

  if (loading) {
    return <div className="p-8 flex justify-center items-center h-screen">Đang tải dữ liệu Dashboard...</div>;
  }

  if (!data) {
    return <div className="p-8 flex justify-center items-center h-screen">Không thể tải dữ liệu Dashboard.</div>;
  }

  // Calculate max for chart
  const maxRevenue = Math.max(...data.chartData.map(d => d.revenue), 1000000);
  const maxUsers = Math.max(...data.chartData.map(d => d.users), 10);

  return (
    <div className="flex flex-col min-w-0 bg-white text-on-background min-h-screen font-body-md w-full">
      {/* Header matching CRUDPageTemplate */}
      <div className="px-8 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:flex-nowrap sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 uppercase">Tổng quan hoạt động</h2>
        </div>
      </div>

      {/* Main Dashboard Canvas */}
      <main className="p-container-margin md:p-stack-lg max-w-[1200px] w-full mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* KPI 1 */}
          <div className="bg-surface-container-lowest p-6 rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <p className="font-label-md text-label-md text-on-surface-variant">Tổng Người Dùng</p>
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">
                {formatNumber(data.totalUsers.value)}
              </h3>
              <span className={`font-label-sm text-label-sm flex items-center gap-1 px-2 py-0.5 rounded ${data.totalUsers.trend >= 0 ? 'text-primary bg-primary/10' : 'text-error bg-error/10'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  {data.totalUsers.trend >= 0 ? "trending_up" : "trending_down"}
                </span> {formatTrend(data.totalUsers.trend)}
              </span>
            </div>
          </div>
          {/* KPI 2 */}
          <div className="bg-surface-container-lowest p-6 rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-container opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <p className="font-label-md text-label-md text-on-surface-variant">Món Ăn Mới</p>
              <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-tertiary transition-colors">
                {formatNumber(data.newFoods.value)}
              </h3>
              <span className={`font-label-sm text-label-sm flex items-center gap-1 px-2 py-0.5 rounded ${data.newFoods.trend >= 0 ? 'text-tertiary bg-tertiary/10' : 'text-error bg-error/10'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                   {data.newFoods.trend >= 0 ? "trending_up" : "trending_down"}
                </span> {formatTrend(data.newFoods.trend)}
              </span>
            </div>
          </div>
          {/* KPI 3 */}
          <div className="bg-surface-container-lowest p-6 rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-error-container opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <p className="font-label-md text-label-md text-on-surface-variant">Doanh Thu (Tháng)</p>
              <span className="material-symbols-outlined text-error-container" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-on-surface group-hover:text-error transition-colors">
                {formatCurrencyVND(data.monthlyRevenue.value)}
              </h3>
              <span className={`font-label-sm text-label-sm flex items-center gap-1 px-2 py-0.5 rounded ${data.monthlyRevenue.trend >= 0 ? 'text-error bg-error/10' : 'text-secondary bg-secondary/10'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  {data.monthlyRevenue.trend >= 0 ? "trending_up" : "trending_down"}
                </span> {formatTrend(data.monthlyRevenue.trend)}
              </span>
            </div>
          </div>
          {/* KPI 4 */}
          <div className="bg-surface-container-lowest p-6 rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="flex justify-between items-start mb-4">
              <p className="font-label-md text-label-md text-on-surface-variant">Đăng Ký Hoạt Động</p>
              <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-secondary transition-colors">
                {formatNumber(data.activeSubscriptions.value)}
              </h3>
              <span className={`font-label-sm text-label-sm flex items-center gap-1 px-2 py-0.5 rounded ${data.activeSubscriptions.trend >= 0 ? 'text-secondary bg-secondary/10' : 'text-error bg-error/10'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                   {data.activeSubscriptions.trend >= 0 ? "trending_up" : "trending_down"}
                </span> {formatTrend(data.activeSubscriptions.trend)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Chart Section */}
        <div className="bg-surface-container-lowest rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Tăng trưởng Người dùng và Doanh thu</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto mr-4">
              <div className="flex items-center gap-4 font-label-sm text-label-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div> Doanh thu</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-tertiary"></div> Người dùng</div>
              </div>
            </div>
          </div>
          
          {/* Chart Rendering */}
          <div className="h-64 w-full relative flex items-end justify-between px-2 gap-2">
            <div className="absolute bottom-0 w-full h-[1px] bg-outline-variant"></div>
            
            {/* Y Axis Labels (Approximate) */}
            <div className="absolute left-0 bottom-0 h-full flex flex-col justify-between text-on-surface-variant font-label-sm text-label-sm pb-6">
              <span className="">{formatNumber(maxRevenue)} ₫</span>
              <span className="">{formatNumber(maxRevenue / 2)} ₫</span>
              <span className="">0</span>
            </div>

            {/* Bars */}
            <div className="w-full flex justify-around h-full items-end ml-16 pb-6 relative z-10">
              {data.chartData.map((d, idx) => {
                // Calculate percentage relative to max
                const revenueHeight = (d.revenue / maxRevenue) * 100;
                const usersHeight = (d.users / maxUsers) * 100;
                
                return (
                  <div key={d.month + idx} className="w-8 md:w-16 flex justify-center gap-1 md:gap-2 items-end group">
                    <div 
                      className="w-3 md:w-6 bg-tertiary rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" 
                      style={{ height: `${Math.max(usersHeight, 1)}%` }}
                      title={`Người dùng: ${d.users}`}
                    ></div>
                    <div 
                      className="w-3 md:w-6 bg-primary-container rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" 
                      style={{ height: `${Math.max(revenueHeight, 1)}%` }}
                      title={`Doanh thu: ${formatCurrencyVND(d.revenue)}`}
                    ></div>
                    <span className="absolute -bottom-6 text-on-surface-variant font-label-sm text-label-sm">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-surface-container-lowest rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">Giao dịch gần đây</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                  <tr>
                    <th className="pb-3 font-medium">Người dùng</th>
                    <th className="pb-3 font-medium">Số tiền</th>
                    <th className="pb-3 font-medium">Trạng thái</th>
                    <th className="pb-3 font-medium">Ngày</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface font-body-md text-body-md">
                  {data.recentTransactions.length > 0 ? (
                    data.recentTransactions.map((tx) => (
                      <tr key={tx.transactionId} className="border-b border-surface-container-lowest hover:bg-surface-container/50 transition-colors">
                        <td className="py-3 flex items-center gap-3">
                          {tx.userAvatar ? (
                            <img src={tx.userAvatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                              {tx.userName.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className="">{tx.userName}</span>
                        </td>
                        <td className="py-3 font-semibold">{formatCurrencyVND(tx.amount)}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded font-label-sm text-label-sm ${
                            tx.status === "Thành công" 
                              ? "bg-primary-container/20 text-on-primary-container"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 text-on-surface-variant text-sm">{tx.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-gray-500">Chưa có giao dịch nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Users & Health Goals */}
          <div className="space-y-6">
            
            {/* Latest Registered Users */}
            <div className="bg-surface-container-lowest rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">Người dùng đăng ký mới nhất</h3>
              </div>
              <div className="space-y-4">
                {data.recentUsers.length > 0 ? (
                  data.recentUsers.map(user => (
                    <div key={user.userId} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt="avatar" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold">
                            {user.username.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">{user.username}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-label-sm text-label-sm text-primary-container">{user.joinDate}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm">Chưa có người dùng mới</p>
                )}
              </div>
            </div>

            {/* Health Goals Status */}
            <div className="bg-surface-container-lowest rounded border border-primary-container/20 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface/5 to-transparent z-0"></div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">vital_signs</span> Thống kê mục tiêu
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Giảm cân</span>
                      <span className="text-on-surface font-semibold">{data.healthGoals.loseWeightPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: `${data.healthGoals.loseWeightPercentage}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Tăng cân</span>
                      <span className="text-on-surface font-semibold">{data.healthGoals.gainWeightPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-[#F97316] h-2 rounded-full" style={{ width: `${data.healthGoals.gainWeightPercentage}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Giữ cân</span>
                      <span className="text-on-surface font-semibold">{data.healthGoals.maintainWeightPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-[#14B8A6] h-2 rounded-full" style={{ width: `${data.healthGoals.maintainWeightPercentage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;