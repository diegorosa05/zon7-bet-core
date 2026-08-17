import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AdminLayout } from "@/components/layouts/admin-layout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AdminArea,
});

function AdminArea() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
