import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AccountLayout } from "@/components/layouts/account-layout";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AccountArea,
});

function AccountArea() {
  return (
    <AccountLayout>
      <Outlet />
    </AccountLayout>
  );
}
