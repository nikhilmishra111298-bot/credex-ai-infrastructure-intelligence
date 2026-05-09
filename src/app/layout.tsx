import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Credex AI Spend Audit",
  description: "AI infrastructure spend optimization dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
  <Toaster position="top-right" />
  {children}
</body>
    </html>
  );
}