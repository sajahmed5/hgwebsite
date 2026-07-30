import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-brand-900">HG Care — admin</h1>
      <p className="mt-2 text-sm text-brand-900/60">
        Sign in to view job applications.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
