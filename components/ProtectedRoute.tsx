import { getSession } from "@/lib/session";

export default async function ProtectedRoute({
  children,
  fallback
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) return <>{fallback}</>;
  return <>{children}</>;
}
