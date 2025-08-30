
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
     

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
