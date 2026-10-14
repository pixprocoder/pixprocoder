export default function SiteWidth({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-4 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </div>
  );
}
