export default function LaunchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:!pl-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Hide sidebar on the launch page */
            body > aside, body > nav:last-of-type { display: none !important; }
            main { padding-left: 0 !important; padding-bottom: 0 !important; }
          `,
        }}
      />
      {children}
    </div>
  );
}
