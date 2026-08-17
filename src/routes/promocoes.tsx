import { Outlet, createFileRoute } from "@tanstack/react-router";

import { BetLayout } from "@/components/layouts/bet-layout";

export const Route = createFileRoute("/promocoes")({
  component: () => (
    <BetLayout>
      <Outlet />
    </BetLayout>
  ),
});
