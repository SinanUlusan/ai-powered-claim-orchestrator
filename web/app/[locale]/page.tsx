import { ClaimDashboard } from "@/components/claim-dashboard/claim-dashboard";
import { LocaleSwitcher } from "@/components/locale-switcher";

export default function Home() {
  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex justify-end">
        <LocaleSwitcher />
      </div>
      <ClaimDashboard />
    </main>
  );
}
