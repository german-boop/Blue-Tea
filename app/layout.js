import "./globals.css";
import QueryProvider from "@/utils/provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Blue Tea",
  description: "Blue Tea",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
      <Toaster/>
        <QueryProvider>
          <main>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
