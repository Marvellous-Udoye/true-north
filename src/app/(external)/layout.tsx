import type { ReactNode } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";

export default function ExternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
        <>{children}</>
      <Footer />
    </div>
  );
}
