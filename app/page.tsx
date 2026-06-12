import { LandingPage } from "@/components/landing/landing-page";
import { navLinks } from "@/components/landing/landing-data";
import { SiteHeader } from "@/components/landing/site-header";

export default function Home() {
  return <LandingPage header={<SiteHeader navLinks={navLinks} />} />;
}
