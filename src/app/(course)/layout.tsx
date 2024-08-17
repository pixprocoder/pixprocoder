export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-[1400px] mx-auto">{children}</main>
    </>
  );
}
