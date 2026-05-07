import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}