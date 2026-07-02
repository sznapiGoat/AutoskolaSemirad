import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar phone={settings.phone} phoneHref={settings.phoneHref} />
      <main>{children}</main>
      <Footer settings={settings} />
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
