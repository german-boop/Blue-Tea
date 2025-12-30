import "./globals.css";
import QueryProvider from "@/utils/react-query-client-provider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import RouteSkeleton from "@/components/feedBack/RouteSkeleton";


export const metadata = {
  title: "Blue Tea",
  description: "Blue Tea",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Toaster />
        <QueryProvider>
          <main>
            <Suspense fallback={<RouteSkeleton />}>
              {children}
            </Suspense>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
