const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-gutter overflow-hidden">
        <div className="absolute top-0 right-0 w-3/4 h-[800px] bg-gradient-to-bl from-primary-container/10 to-transparent -z-10 rounded-bl-[120px]"></div>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 relative z-10">
            <h1 className="font-display text-display text-on-surface">
              <span className="gradient-text">Huấn Luyện Viên AI</span>, Theo Dõi Dinh Dưỡng &amp; Cộng Đồng Gym Trong Một Ứng Dụng
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Kết nối liền mạch theo dõi dinh dưỡng bằng AI, huấn luyện viên chuyên nghiệp, đặt lịch thông minh và mục tiêu tiến độ thời gian thực. Nâng tầm hành trình thể hình của bạn với độ chính xác sinh học và khả năng tiếp cận tối đa.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary px-6 py-3 rounded-full font-label-md text-label-md transition-transform active:scale-95 cursor-pointer">Bắt Đầu Miễn Phí</button>
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-label-md text-label-md transition-colors border border-outline-variant cursor-pointer">Tìm Huấn Luyện Viên</button>
              <button className="text-primary hover:text-on-primary-fixed-variant px-6 py-3 font-label-md text-label-md transition-colors underline decoration-transparent hover:decoration-primary cursor-pointer">Trở Thành Huấn Luyện Viên</button>
            </div>
          </div>
          <div className="relative w-full h-[600px] flex justify-center items-center">
            {/* Main Mockup */}
            <div className="relative w-72 h-[580px] bg-surface-container-lowest rounded-[40px] shadow-2xl border-[8px] border-surface-container-highest overflow-hidden z-20">
              <img className="w-full h-full object-cover" alt="App mockup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiOAgtIAXWnzWkMD6zievyshD5pAc4pnHbR0nrv5jDWX1hfQnbJ5JT5-XBDDgI9EToX15GGCiU87Mb2uIjDCoDhUPe8iEZ8D43HUOPKKSzXFJgSIvv-uEntFkAU6tf9-0113iOxuB68voXst2N8F3OfvdNLU-XZ_OB4_iz1s2RXCju8bO_09hrduLOV0P6tHYk-YQhpsHCkaHglRDyq4TY61ieTP42HTb5u7vWo0vobhjP9atRkROH5eqhxjP9tNfrP5nZwHy6lR4" />
            </div>
            {/* Floating Elements */}
            <div className="absolute top-20 -left-12 ai-glass rounded-xl p-4 flex items-center gap-3 z-30 shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Huấn Luyện Viên Xác Thực</p>
                <p className="font-label-md text-label-md text-on-surface">Sarah J. • Gần Bạn</p>
              </div>
            </div>
            <div className="absolute bottom-32 -right-16 ai-glass rounded-xl p-4 flex flex-col gap-2 z-30 shadow-lg animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">nutrition</span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">AI Đã Nhận Diện</p>
              </div>
              <p className="font-label-md text-label-md text-on-surface">Cơm Gà • 450 kcal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-surface-container-low px-gutter">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-16">
          <div className="text-center max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">GENIFIT kết nối AI, huấn luyện viên, dinh dưỡng, đặt lịch và theo dõi tiến độ</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Trải nghiệm hệ sinh thái liền mạch được thiết kế để loại bỏ những phỏng đoán khỏi mục tiêu sức khỏe và thể hình của bạn.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 w-full">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-variant hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">smart_toy</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Theo Dõi Dinh Dưỡng AI</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Chụp ảnh bữa ăn. AI của chúng tôi sẽ nhận diện thực phẩm và ghi chép dinh dưỡng tức thì.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-variant hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-6 text-tertiary">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Chợ Huấn Luyện Viên Xác Thực</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Duyệt hồ sơ các chuyên gia, xem đánh giá và tìm người phù hợp nhất cho mục tiêu của bạn.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-variant hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Đặt Lịch &amp; Thanh Toán Thông Minh</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Lên lịch các buổi tập và thanh toán an toàn. Không còn những đoạn chat lộn xộn.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-variant hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-6 text-tertiary">
                <span className="material-symbols-outlined text-3xl">insights</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Kiểm Tra Tiến Độ Hàng Tuần</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Báo cáo tự động tóm tắt dữ liệu trong tuần, giúp huấn luyện viên điều chỉnh kế hoạch linh hoạt.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage