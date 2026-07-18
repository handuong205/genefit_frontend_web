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
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
