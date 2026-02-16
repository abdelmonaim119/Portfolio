import AdminLoginForm from "@/components/AdminLoginForm";
import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

function LoginScreen() {
  return (
    <div className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-paper-200 bg-white p-7">
          <h1 className="text-xl font-semibold tracking-tight text-ink-950">Admin Login</h1>
          <p className="mt-2 text-sm text-ink-800">Sign in to manage projects.</p>
          <div className="mt-6">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute fallback={<LoginScreen />}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

