import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartResponse - Smart Accident Report System",
  description: "AI-powered accident reporting and emergency dispatch system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Try direct theme first
                  let theme = localStorage.getItem('theme');
                  
                  // Fallback to theme-storage if direct theme not found
                  if (!theme) {
                    const stored = localStorage.getItem('theme-storage');
                    if (stored) {
                      const parsed = JSON.parse(stored);
                      theme = parsed.state?.theme || 'light';
                    }
                  }
                  
                  // Apply theme or default to light
                  const finalTheme = theme || 'light';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(finalTheme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: "dark:bg-gray-800 dark:text-white",
              style: {
                background: "var(--surface-elevated)",
                color: "var(--text-primary)",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
