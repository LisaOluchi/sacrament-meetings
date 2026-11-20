export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section aria-label="Leader tools">
      <p className="mb-4 rounded bg-yellow-100 px-3 py-2 text-sm text-yellow-900">
        Leader area. Authentication is added in Week 05.
      </p>
      {children}
    </section>
  );
}
