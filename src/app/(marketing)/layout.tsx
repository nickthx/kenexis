import { ViewTransitions } from "next-view-transitions";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <SiteHeader />
      <Breadcrumbs />
      <main id="main-content" className="min-h-screen pt-16">
        {children}
      </main>
      <SiteFooter />
    </ViewTransitions>
  );
}
