import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Intentionally minimal – no navigation shell for auth pages
    <main>{children}</main>
  );
}
