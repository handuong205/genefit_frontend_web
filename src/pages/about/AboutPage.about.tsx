const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-surface-container-lowest transition-all duration-1000 opacity-100 translate-y-0">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full object-cover opacity-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpxZilZmUtfwhh2euTT39ZJtGYMrxEYtatLMCHZy7IichkahLf8AIxrN5UM8fEfqkkE0aZ3MIeVYr4cJ1R3yibXGm28QbO67vkj7JxcAdK50XlqF7QqoIauwstAlp59E9_xxifsQjDMutXL7YZlwJI8oUqaWEWK-VMCv-VJFPGwuno_O1drstFUSLxDWbiVv6TUzPiItiIF_PmITFnjvI4s-yl-PJv9dIXxtoHRIkieX9H5mjRXyv2iPuxNFavG9bvM_TgMdsX8i8')" }}></div>
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-container-margin grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-container/10 text-primary font-label-md">Định hình tương lai Fitness</span>
            <h1 className="font-display text-display leading-tight">
              Dẫn đầu cuộc cách mạng <span className="text-gradient">Fitness AI</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-lg">
              GENEFIT kết hợp sức mạnh của trí tuệ nhân tạo với độ chính xác sinh học để mang lại trải nghiệm sức khỏe cá nhân hóa tuyệt đối.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 rounded-xl bg-primary text-on-primary font-label-md shadow-lg shadow-primary/20 hover:shadow-xl transition-all cursor-pointer">Khám phá hành trình</button>
              <button className="px-8 py-4 rounded-xl border border-outline text-on-surface font-label-md hover:bg-surface-container transition-all cursor-pointer">Xem video giới thiệu</button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative z-10 w-full max-w-md aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img alt="GENEFIT Logo" className="w-full h-full object-contain p-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnd3zleee2ACYHTY5nZAPyw-CeAfPsNJy9DvdEEvCYOWWporGB77T2ugQGE4blQ0pae-t0K3R1Ami3uyG1bo85bdfpdj4qw71L5j5vlEupdKJ63i9hfINNrm8sztcV1EHxC8w_doXccb4KnO8zPUWqe3ks2yl1QhnVierZqIgDRk-URWKlPIb6IKtEjScgZTOEpAMJn-VGFcR_QXcf0zwInmVnM2wF3QTS6o5ooBXL3-Moo_A83yqsxYnqCk0UVdXTi1NTg_ikC7o" />
            </div>
            {/* Decorative AI elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 glass-card rounded-full flex items-center justify-center p-4 animate-bounce" style={{ animationDuration: '4s' }}>
              <span className="material-symbols-outlined text-primary text-4xl">neurology</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 glass-card rounded-2xl flex items-center justify-center p-4 animate-pulse">
              <span className="material-symbols-outlined text-secondary text-4xl">dns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-stack-lg bg-surface transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-xl">
              <img className="w-full h-full object-cover" alt="Mission" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5Y4vcaFLDRP_Fu8eLhSx3El9iNHrREo7gEaE1LQk--Dz5sxPiqO0C_1Hm4Ut98CmhRr8N3cAZjcZ-f5sPiyeS1SJBgrj86oCdR8x6dooLCvVYA261jCH0qHnA_XEDZMlhMb0figj7LbyzRPvGDzIPZR72B6gLY1dKjWXuibOrYAWun_Ge-uhysLW92rlzbbCqGnuO791ybBLK5e0Xu0K8hWvrJGCESAdwn8yP7B5bKid7WmXoA-YF61qInM9_-PiPOPXkeFz9sc" />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-headline-lg text-headline-lg mb-4">Sứ mệnh của chúng tôi</h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Tại GENEFIT, chúng tôi tin rằng sức khỏe không thể là một công thức chung. Sứ mệnh của chúng tôi là xóa bỏ khoảng cách giữa các số liệu dữ liệu thô và kết quả thực tế thông qua sự kết hợp giữa **Độ chính xác Sinh học** và **Khả năng tiếp cận của con người**.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant hover:border-primary transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-primary mb-1">Trí Tuệ Dinh Dưỡng</h4>
                    <p className="font-body-md text-on-surface-variant">Phân tích sâu thành phần dinh dưỡng dựa trên mục tiêu sinh học của riêng bạn.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant hover:border-primary transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0 group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-tertiary mb-1">Huấn Luyện Bởi Chuyên Gia</h4>
                    <p className="font-body-md text-on-surface-variant">Kết nối AI thông minh với những huấn luyện viên thực thụ để tối ưu hóa động lực.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values: Bento Grid style */}
      <section className="py-stack-lg bg-surface-container-lowest transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-headline-lg text-headline-lg">Giá Trị Cốt Lõi</h2>
            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Nền tảng giúp GENEFIT trở thành đối tác tin cậy trong hành trình thay đổi bản thân của bạn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Value 1: Science-First */}
            <div className="md:col-span-2 md:row-span-1 p-8 rounded-[2rem] bg-on-tertiary-fixed text-on-tertiary flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <span className="material-symbols-outlined text-4xl mb-4 text-primary-fixed">science</span>
              <h3 className="font-headline-md text-headline-md mb-2">Ưu Tiên Khoa Học</h3>
              <p className="font-body-md text-white/70">Mọi kế hoạch đều được bảo chứng bởi các nghiên cứu dinh dưỡng và thể chất hiện đại nhất.</p>
            </div>
            {/* Value 2: AI-Powered */}
            <div className="md:col-span-1 md:row-span-2 p-8 rounded-[2rem] bg-primary text-on-primary flex flex-col justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 pointer-events-none"></div>
              <span className="material-symbols-outlined text-6xl mb-6 mx-auto" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="font-headline-md text-headline-md mb-4">Sức Mạnh AI</h3>
              <p className="font-body-md text-white/80">Tận dụng công nghệ tiên tiến để đơn giản hóa quá trình theo dõi và phân tích chỉ số.</p>
            </div>
            {/* Value 3: Community */}
            <div className="md:col-span-1 md:row-span-1 p-8 rounded-[2rem] bg-surface-container-high border border-outline-variant flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-4xl mb-4 text-secondary">groups</span>
              <h3 className="font-label-md text-on-surface text-[18px]">Cộng Đồng Động Lực</h3>
              <p className="font-body-md text-on-surface-variant">Kết nối với các chuyên gia và đối tác uy tín.</p>
            </div>
            {/* Value 4: Personalization */}
            <div className="md:col-span-2 md:row-span-1 p-8 rounded-[2rem] bg-surface-container-lowest border border-outline flex flex-col md:flex-row gap-8 items-center group">
              <div className="w-24 h-24 shrink-0 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-4xl text-on-secondary-container group-hover:rotate-45 transition-transform duration-500">fingerprint</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md mb-2">Cá Nhân Hóa</h3>
                <p className="font-body-md text-on-surface-variant">Không có kế hoạch rập khuôn, chỉ có lộ trình duy nhất dành riêng cho cơ thể bạn.</p>
              </div>
            </div>
            {/* Value 5: Micro-stat */}
            <div className="md:col-span-1 md:row-span-1 p-8 rounded-[2rem] bg-tertiary text-on-tertiary flex flex-col items-center justify-center text-center">
              <span className="text-display font-black">99%</span>
              <p className="font-label-sm uppercase tracking-widest mt-2">Độ chính xác dữ liệu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-stack-lg overflow-hidden transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <h2 className="font-headline-lg text-headline-lg mb-6">Câu chuyện của chúng tôi</h2>
              <p className="font-body-md text-on-surface-variant mb-8">
                Khởi nguồn từ khao khát giải quyết khoảng cách giữa việc theo dõi thể chất và kết quả huấn luyện thực tế.
              </p>
              <div className="p-6 rounded-2xl bg-primary-container/10 border-l-4 border-primary">
                <p className="italic font-body-md text-primary">"Chúng tôi thành lập Genefit không chỉ để tạo ra một ứng dụng, mà là để xây dựng một tương lai nơi AI phục vụ sức khỏe con người một cách nhân văn nhất."</p>
              </div>
            </div>
            <div className="lg:col-span-8 space-y-12">
              {/* Timeline Item */}
              <div className="relative pl-12 pb-12 border-l-2 border-outline-variant">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary-container/20"></div>
                <span className="font-display text-headline-lg text-primary/30">2026</span>
                <h4 className="font-headline-md text-headline-md mb-2">Khởi Đầu Tầm Nhìn</h4>
                <p className="font-body-md text-on-surface-variant">GENEFIT chính thức ra đời tại trung tâm công nghệ, tập trung vào việc tích hợp các mô hình ngôn ngữ lớn vào dinh dưỡng cá nhân.</p>
                <div className="mt-6 rounded-2xl overflow-hidden h-48 bg-surface-container">
                  <img className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 transition-all duration-500" alt="Khởi Đầu Tầm Nhìn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQaPTluoYzBwHPtBwUjWOv6oOnMpDCGD44JpGc7E8zSsKCAw9YIzwdHN1qHPSc6NYAMUqbAX6qEa6VSKhWTp8hCiLNcGteK8eVU4MN9nbN6mK2rmx7mp3m-OTAV5ZVdo8bJBQSL7xqjrUWEi2_YYdbWDeZEnEiCF-NCfkq9o2V8UoqqyXcV_3qqzEXtBKJmXwXwZpsQRlGoZ1WdY5Zx_kAa8uENKT3g6apGMmOzmWfAwn8uJWMelPXxg7Ac09OWu5G8BApVptxSOU" />
                </div>
              </div>
              <div className="relative pl-12 pb-12 border-l-2 border-outline-variant">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-variant"></div>
                <span className="font-display text-headline-lg text-on-surface-variant/30">2027</span>
                <h4 className="font-headline-md text-headline-md mb-2">Đột Phá Thuật Toán</h4>
                <p className="font-body-md text-on-surface-variant">Phát triển thành công hệ thống phân tích Bio-Sync, cho phép AI phản hồi thời gian thực với các chỉ số sinh học từ thiết bị đeo thông minh.</p>
              </div>
              <div className="relative pl-12 border-l-2 border-outline-variant">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-variant"></div>
                <span className="font-display text-headline-lg text-on-surface-variant/30">2028 &amp; Tương Lai</span>
                <h4 className="font-headline-md text-headline-md mb-2">Mở Rộng Hệ Sinh Thái</h4>
                <p className="font-body-md text-on-surface-variant">Hợp tác với các trung tâm thể hình toàn cầu để mang lại trải nghiệm huấn luyện 'Phygital' (Vật lý + Kỹ thuật số) hoàn chỉnh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="py-stack-lg bg-surface-container-low transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg mb-4">Đội Ngũ Chuyên Gia</h2>
            <p className="font-body-md text-on-surface-variant">Những bộ óc đứng sau sự kết hợp giữa Khoa học và Công nghệ.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="group text-center">
              <div className="relative mb-6 rounded-3xl overflow-hidden aspect-[3/4] bg-surface-container-highest">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Minh Anh Lê" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5pcg6hyhOJoskngB2FZzvcIA9cgwRUPwz34AXefXjOZEtDzvHL-z9mQGfmndSldQqeN54AT1hkBIyHyR5hjo5AjxlwJTBECSdJkx2znSCcVwzV62lzzVlR0LMZv94IeD2mMm2oqD2_gTjrYh6ukwEt5O3QH4EyyHvGt_WM2WMCccMlqWs3SvjqzMU-D9IeFOwusa_fF_GFxUq71qMwNVK3WFmfQP5HT0rjwThXK-BUa7PJG2znhOM3fzgha33tlpZiITtnIGc6LM" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer"><span className="material-symbols-outlined text-[20px]">link</span></button>
                </div>
              </div>
              <h4 className="font-label-md text-[18px]">Minh Anh Lê</h4>
              <p className="font-label-sm text-primary uppercase tracking-wider">Founder &amp; CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="group text-center">
              <div className="relative mb-6 rounded-3xl overflow-hidden aspect-[3/4] bg-surface-container-highest">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Dr. Robert Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhUMvBTjRtS7NvKE8VfvZh_6U1SAYmletBPyJ5glCCA48gdXcR1wmfu4k0onWhw9ANB2LtZYcSbCrVYFAUjWI-XJTh8116y9z2mAUohsAmndklSrd2foEXoVrKAaBJCka5t5AuMukQRj34tS_XSDwwmOdJIZjsamn2D-zlcLluvfcEYkp-wjPbGfE2K_L-owpEa9sQLeO7XVdA5lDKmbDLd08CzZf-7h8MR2C1OGXbyegd3JHZKkhAAIuJoPSd43ahYQMcq3A6p5c" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer"><span className="material-symbols-outlined text-[20px]">link</span></button>
                </div>
              </div>
              <h4 className="font-label-md text-[18px]">Dr. Robert Chen</h4>
              <p className="font-label-sm text-primary uppercase tracking-wider">Chief Medical Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="group text-center">
              <div className="relative mb-6 rounded-3xl overflow-hidden aspect-[3/4] bg-surface-container-highest">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Kevin Nguyen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBenKMIB8w45KOJ9bgpP1emBz6rQNL6OO3nem-qGmrDXYN7NDJ9XUzdnCdFCTr8CtX3sayi0CIsFjOwXIevl4D6N2JU3GnCjaDQHWQ3xMsoEirwBUHe_kSW_bN2YGQBD41mGmiACJ9wkQgMsUzZF3QHEzbJsPOFn3ghsSjXSZQGy0DmkHVdHbXL5OypG-WMBOB92t8ysemxvJ0ZXuCPcpVIOMgVNsOuP0UPGUvLQaUFQeHsLpX4DyhB2vLG-KW8Xt7xkuvxlbqKzbQ" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer"><span className="material-symbols-outlined text-[20px]">link</span></button>
                </div>
              </div>
              <h4 className="font-label-md text-[18px]">Kevin Nguyen</h4>
              <p className="font-label-sm text-primary uppercase tracking-wider">Lead AI Engineer</p>
            </div>
            {/* Team Member 4 */}
            <div className="group text-center">
              <div className="relative mb-6 rounded-3xl overflow-hidden aspect-[3/4] bg-surface-container-highest">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Sarah Parker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJjXgiNnr887Yl_oeVKgkEj37QWiIpFe3nqNYchu2L4euhQ9WXh4WhSUBkChJwfwmpf0CJMaag1TRZkZmmtaiREukcTbpbE3ruzHTnaRxthjyawp0WdO2ayh-ymKqVXWZQDEN9X1nBRRHqvmdZdS0XWZy5JKQ_ujZAO_1AyFMcWwtqMeerS3HXwcrMhscTYGvdFP4-nx1ryyQL1KyPRD72BLkd38uOvrCuSW8Bw6KaAAeELXLGEOQS0LPlTqu3NnLp6RjfMzzMLtg" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer"><span className="material-symbols-outlined text-[20px]">link</span></button>
                </div>
              </div>
              <h4 className="font-label-md text-[18px]">Sarah Parker</h4>
              <p className="font-label-sm text-primary uppercase tracking-wider">Head of Coaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 border-y border-outline-variant transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          <p className="text-center font-label-sm text-on-surface-variant uppercase tracking-widest mb-10">Hợp tác cùng các tổ chức hàng đầu</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <div className="flex items-center gap-2 font-black text-2xl">
              <span className="material-symbols-outlined">health_and_safety</span> MED-TECH
            </div>
            <div className="flex items-center gap-2 font-black text-2xl">
              <span className="material-symbols-outlined">fitness_center</span> GLOBAL GYM
            </div>
            <div className="flex items-center gap-2 font-black text-2xl">
              <span className="material-symbols-outlined">school</span> BIO-INSTITUTE
            </div>
            <div className="flex items-center gap-2 font-black text-2xl">
              <span className="material-symbols-outlined">biotech</span> AI-RESEARCH
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-stack-lg transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-[1200px] mx-auto px-container-margin">
          <div className="relative bg-on-tertiary-fixed rounded-[3rem] p-12 md:p-20 overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="font-display text-headline-lg md:text-display text-white">Bạn đã sẵn sàng cho một bản thể tốt hơn?</h2>
              <p className="font-body-lg text-white/70 max-w-2xl mx-auto">
                Gia nhập cộng đồng GENEFIT ngay hôm nay và trải nghiệm sự khác biệt từ AI thực thụ.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-5 rounded-full bg-primary-container text-on-primary-container font-headline-md hover:scale-105 transition-transform cursor-pointer">Bắt đầu miễn phí</button>
                <button className="px-10 py-5 rounded-full border border-white/20 text-white font-headline-md hover:bg-white/10 transition-colors cursor-pointer">Liên hệ chuyên gia</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage