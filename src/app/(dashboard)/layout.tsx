import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-[260px] pt-[64px] min-h-screen flex flex-col bg-surface-bright">
        {children}
      </main>
    </>
  );
}
