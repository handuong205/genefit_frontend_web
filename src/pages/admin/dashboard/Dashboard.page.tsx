import { useState } from "react";

const DashboardPage = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [viewDate, setViewDate] = useState(new Date());

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

  return (
    <div className="flex flex-col min-w-0 bg-white text-on-background min-h-screen font-body-md w-full">
      {/* Header matching CRUDPageTemplate */}
      <div className="px-8 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:flex-nowrap sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800 uppercase">Tổng quan hoạt động</h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
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
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">12,450</h3>
              <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded">
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>trending_up</span> +12%
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
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-tertiary transition-colors">842</h3>
              <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 bg-tertiary/10 px-2 py-0.5 rounded">
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>trending_up</span> +5%
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
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-error transition-colors">124.5M</h3>
              <span className="font-label-sm text-label-sm text-error flex items-center gap-1 bg-error/10 px-2 py-0.5 rounded">
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>trending_up</span> +24%
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
              <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-secondary transition-colors">3,120</h3>
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded">
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>trending_flat</span> 0%
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
              <div className="relative">
                <select className="appearance-none bg-surface-container-low border border-surface-container-highest rounded px-3 py-1.5 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-1 focus:ring-primary cursor-pointer outline-none">
                  <option>Tháng này</option>
                  <option>Tháng trước</option>
                  <option>6 tháng qua</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ fontSize: "18px" }}>expand_more</span>
              </div>
              
              {/* Date Picker Popup */}
              <div className="relative">
                <button 
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="p-1.5 bg-surface-container-low border border-surface-container-highest rounded hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>calendar_today</span>
                </button>
                
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col gap-4 min-w-[300px] animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <label className="text-sm font-bold text-gray-700">Chọn thời gian</label>
                      <button onClick={() => setShowDatePicker(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
                      </button>
                    </div>
                    
                    {/* Manual Input */}
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Ngày cụ thể</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 font-medium" 
                        value={customDate}
                        onChange={(e) => {
                          setCustomDate(e.target.value);
                          if (e.target.value) {
                             const parsed = new Date(e.target.value);
                             if (!isNaN(parsed.getTime())) {
                               setViewDate(parsed);
                             }
                          }
                        }}
                      />
                    </div>
                    
                    {/* Custom Calendar Grid */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-200 rounded cursor-pointer transition-colors">
                          <span className="material-symbols-outlined text-gray-600" style={{ fontSize: "18px" }}>chevron_left</span>
                        </button>
                        <span className="text-sm font-bold text-gray-700">
                          Tháng {viewDate.getMonth() + 1}, {viewDate.getFullYear()}
                        </span>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-200 rounded cursor-pointer transition-colors">
                          <span className="material-symbols-outlined text-gray-600" style={{ fontSize: "18px" }}>chevron_right</span>
                        </button>
                      </div>
                      
                      {/* Days of week */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                          <div key={day} className="text-[11px] font-bold text-gray-400 uppercase">{day}</div>
                        ))}
                      </div>
                      
                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-gray-100">
                       <button 
                          onClick={() => setShowDatePicker(false)} 
                          className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                          Áp dụng
                        </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 font-label-sm text-label-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-container"></div> Doanh thu</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-tertiary"></div> Người dùng</div>
            </div>
          </div>
          {/* Chart Placeholder - Simulated with CSS */}
          <div className="h-64 w-full relative flex items-end justify-between px-2 gap-2">
            <div className="absolute bottom-0 w-full h-[1px] bg-outline-variant"></div>
            {/* Y Axis Labels */}
            <div className="absolute left-0 bottom-0 h-full flex flex-col justify-between text-on-surface-variant font-label-sm text-label-sm pb-6">
              <span className="">$1M</span>
              <span className="">$500K</span>
              <span className="">0</span>
            </div>
            {/* Bars */}
            <div className="w-full flex justify-around h-full items-end ml-10 pb-6 relative z-10">
              {['T5', 'T6', 'T7', 'T8', 'T9', 'T10'].map((month, idx) => {
                const heights = [
                  [40, 50], [45, 60], [55, 65], [70, 75], [80, 85], [95, 100]
                ][idx];
                return (
                  <div key={month} className="w-8 md:w-16 flex justify-center gap-1 md:gap-2 items-end group">
                    <div className="w-3 md:w-6 bg-tertiary rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${heights[0]}%` }}></div>
                    <div className="w-3 md:w-6 bg-primary-container rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${heights[1]}%` }}></div>
                    <span className="absolute -bottom-6 text-on-surface-variant font-label-sm text-label-sm">{month}</span>
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
              <a className="text-primary-container font-label-md text-label-md hover:underline" href="#">Xem tất cả</a>
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
                  <tr className="border-b border-surface-container-lowest hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">NA</div>
                      <span className="">Nguyễn Văn A</span>
                    </td>
                    <td className="py-3 font-semibold">$199.00</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-primary-container/20 text-on-primary-container font-label-sm text-label-sm">Thành công</span>
                    </td>
                    <td className="py-3 text-on-surface-variant text-sm">24 Th10</td>
                  </tr>
                  <tr className="border-b border-surface-container-lowest hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-sm">TB</div>
                      <span className="">Trần Thị B</span>
                    </td>
                    <td className="py-3 font-semibold">$49.99</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-primary-container/20 text-on-primary-container font-label-sm text-label-sm">Thành công</span>
                    </td>
                    <td className="py-3 text-on-surface-variant text-sm">24 Th10</td>
                  </tr>
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-sm">LC</div>
                      <span className="">Lê Văn C</span>
                    </td>
                    <td className="py-3 font-semibold">$89.00</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-label-sm text-label-sm">Đang xử lý</span>
                    </td>
                    <td className="py-3 text-on-surface-variant text-sm">23 Th10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Coaches Performance & System Status */}
          <div className="space-y-6">
            {/* Coaches */}
            <div className="bg-surface-container-lowest rounded border border-surface-container-highest shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface">HLV Hoạt động Tích cực</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7axQ58jZu1lXc_sZQ-B8mgnpKqnOdON6Jupkxbtiki6d2aaKur347IR89ZrdgOp8QIWbtbagmSldYKTx0HKe0FMR61Itdanq4iakrNO_LhSL6fzV7lDO9fpVojjOtxSKKEvc5gskYDDrqsGeunMu7GmJm99Mjnkst9wbNDfHqrRCxLWRXPuS7SHzCmg3WaUmCCW9vLHGAerFDPO-_8_etfRx4zRbUx1v2oZULWU-GdYEpYZr8pvBJUhdUk8io4pOMjUnG733l3U" />
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">Hoàng Nam</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-500" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>star</span> 4.9 (120 đánh giá)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-surface">45 Khách hàng</p>
                    <p className="font-label-sm text-label-sm text-primary-container">+3 tuần này</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb-nRUOB0UBwa-fC8WIx9ZWjfa_gzzxgRU0H0z2HT9gY_7cpyafpTMK1A3oP7DQMnADMGE2nIPNcrHE-ZysL_z_EiqFKVtCubSWVmtwjqt-zomJwXf-m87bSUHn9FMCyHcABzjvAKb_-TDHrwcOl-zWJm7ZC78br7JG8hnB38FJG8NDkyp9BvA88c4rIkn6vqf-S1oQMevtc1WpBMG1cxlMUJ_3HG0GqJwL53q8mo1kQl_pWxHuu9SJ3UIwfMnuKtZ8tqX4Nd_Sc8" />
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">Mai Hoa</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-500" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>star</span> 4.8 (95 đánh giá)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-surface">38 Khách hàng</p>
                    <p className="font-label-sm text-label-sm text-primary-container">+1 tuần này</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status Widget */}
            <div className="bg-surface-container-lowest rounded border border-primary-container/20 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface/5 to-transparent z-0"></div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container"></span> Thông tin sức khỏe
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Giảm cân</span>
                      <span className="text-on-surface font-semibold">60%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-[#22C55E] h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Tăng cân</span>
                      <span className="text-on-surface font-semibold">30%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-[#F97316] h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Giữ cân</span>
                      <span className="text-on-surface font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-[#14B8A6] h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  {/* <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface-variant">Tăng cân</span>
                      <span className="text-on-surface font-semibold text-primary-container">Bình thường (12ms)</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-tertiary h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div> */}
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
