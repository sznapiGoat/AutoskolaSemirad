import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd, drivingSchoolJsonLd } from "@/components/seo/JsonLd";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <MotionProvider>
      <JsonLd data={drivingSchoolJsonLd(settings)} />
      <Navbar phone={settings.phone} phoneHref={settings.phoneHref} logoUrl={settings.logoUrl} />
      <main>{children}</main>
      <Footer settings={settings} />
      <MobileCallBar phone={settings.phone} phoneHref={settings.phoneHref} />
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
    </MotionProvider>
  );
}
