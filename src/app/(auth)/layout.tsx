export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.04_245/_0.45),transparent_55%)]" />
      <div className="relative z-10 flex w-full justify-center">{children}</div>
    </div>
  );
}
