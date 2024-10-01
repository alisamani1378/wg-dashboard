import { Header } from "@/components/Header/Header";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export const metadata = {
  title: "WG Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="w-screen h-[calc(100vh_-_56px)] flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
