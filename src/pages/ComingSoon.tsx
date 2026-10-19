import { Link, useLocation } from "react-router-dom";
import { Construction } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";

export default function ComingSoon() {
  const { pathname } = useLocation();
  const home = pathname.startsWith("/admin") ? "/admin" : "/app";
  return (
    <>
      <PageHeader title="Screen in progress" description="This part of the prototype has not been built yet." />
      <EmptyState icon={Construction} title="Coming next" description="This screen will be added in the next build step." action={<Button asChild variant="outline"><Link to="/">Back to demo start</Link></Button>} />
      <span className="sr-only">{home}</span>
    </>
  );
}
