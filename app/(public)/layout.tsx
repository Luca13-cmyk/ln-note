import { Metadata } from "next";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Public Doc",
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex flex-col dark:bg-[#1F1F1F]">
      <Navbar />
      {children}
    </div>
  );
};

export default PublicLayout;
