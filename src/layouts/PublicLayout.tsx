import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export type PublicLayoutProps = {
  children: React.ReactNode;
};
const PublicLayout = (props: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8 mt-16 md:mt-8">
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
