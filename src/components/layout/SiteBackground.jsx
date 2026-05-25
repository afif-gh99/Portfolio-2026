function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04162c]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#031225_0%,#020817_48%,#041226_100%)]" />{" "}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.065)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.055)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,18,37,0.16)_62%,rgba(2,8,23,0.7)_100%)]" />
    </div>
  );
}

export default SiteBackground;
