export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navigation will be added in Phase 2 */}
      <main id="main-content">{children}</main>
      {/* Footer will be added in Phase 2 */}
    </>
  );
}
