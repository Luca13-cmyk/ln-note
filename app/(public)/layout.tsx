import { Navbar } from "./_components/navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex flex-col dark:bg-[#1F1F1F]">
      <Navbar />
      {children}
    </div>
  );
};

export default PublicLayout;
