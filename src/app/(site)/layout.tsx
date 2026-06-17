import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { Toaster } from "sonner";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <DemoBadge />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0A0A0A",
            color: "#ffffff",
            border: "1px solid rgba(214,0,15,0.4)",
          },
        }}
      />
    </>
  );
}
