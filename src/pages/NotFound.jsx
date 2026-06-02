import { useNavigate, useOutletContext } from "react-router-dom";

const routeNodes = [
  { label: "HOME", x: "18%", y: "28%" },
  { label: "ABOUT", x: "38%", y: "22%" },
  { label: "EXPERIENCE", x: "58%", y: "34%" },
  { label: "SKILLS", x: "35%", y: "56%" },
  { label: "PROJECTS", x: "62%", y: "64%" },
  { label: "CONTACT", x: "78%", y: "44%" },
];

function NotFound() {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const isPageTransitioning = outletContext?.isPageTransitioning;
  const startRouteTransition = outletContext?.startRouteTransition;

  const handleBackHome = () => {
    if (isPageTransitioning) {
      return;
    }

    if (startRouteTransition) {
      startRouteTransition("/");
      return;
    }

    navigate("/");
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#020817] px-5 py-24 text-slate-50 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.035)_1px,transparent_1px)] bg-size-[44px_44px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[16%] h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[10%] h-[28rem] w-[28rem] rounded-full bg-sky-500/7 blur-3xl"
      />

      <section
        aria-labelledby="not-found-title"
        className="relative z-10 mx-auto grid min-h-[calc(100dvh-12rem)] w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(28rem,1fr)]"
      >
        <div className="relative">
          <div aria-hidden="true" className="mb-7 flex items-center gap-4">
            <span className="h-px w-10 bg-cyan-100/26" />
            <span className="font-osiris text-xs uppercase tracking-[0.34em] text-cyan-100/58">
              404 / ROUTE NOT FOUND
            </span>
          </div>

          <h1
            id="not-found-title"
            data-cursor="text"
            className="font-bruno max-w-[8ch] text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-slate-50 drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            LOST
            <br />
            SIGNAL.
          </h1>

          <p
            data-cursor="text"
            className="font-oxanium mt-8 max-w-xl text-sm leading-7 text-slate-200/72 sm:text-base sm:leading-8"
          >
            The requested route dissolved outside the interface map.
          </p>

          <button
            type="button"
            disabled={isPageTransitioning}
            onClick={handleBackHome}
            data-cursor={isPageTransitioning ? undefined : "interactive"}
            data-sound={isPageTransitioning ? undefined : "click"}
            data-sound-hover={isPageTransitioning ? undefined : "hover"}
            className="font-oxanium mt-9 inline-flex min-h-12 items-center justify-center border border-cyan-100/24 bg-cyan-100/7 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-50 shadow-[0_0_24px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 hover:border-cyan-100/46 hover:bg-cyan-100/12 hover:shadow-[0_0_30px_rgba(34,211,238,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] disabled:cursor-not-allowed disabled:opacity-55"
          >
            BACK TO HOME
          </button>
        </div>

        <div
          aria-hidden="true"
          className="relative min-h-[26rem] overflow-hidden border border-cyan-100/14 bg-[#061426]/42 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-xl sm:min-h-[31rem] sm:p-8"
        >
          <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-cyan-100/36" />
          <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-cyan-100/26" />
          <span className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-cyan-100/30 to-transparent" />

          <div className="font-osiris absolute left-7 top-7 text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
            ROUTE TRACE
          </div>
          <div className="font-osiris absolute right-7 top-7 text-[10px] uppercase tracking-[0.28em] text-cyan-100/35">
            NODE: UNKNOWN
          </div>

          <div className="absolute inset-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M18 28 L38 22 L58 34 L62 64 L35 56 L18 28"
                fill="none"
                stroke="rgba(125,211,252,0.22)"
                strokeWidth="0.35"
              />
              <path
                d="M58 34 L78 44"
                fill="none"
                stroke="rgba(125,211,252,0.18)"
                strokeWidth="0.35"
              />
              <path
                d="M78 44 L88 70"
                fill="none"
                stroke="rgba(34,211,238,0.48)"
                strokeDasharray="2 3"
                strokeWidth="0.42"
              />
            </svg>

            {routeNodes.map((node) => (
              <span
                key={node.label}
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/32 bg-cyan-100/50 shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                style={{ left: node.x, top: node.y }}
              />
            ))}

            <span
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-300/35 bg-red-300/35 shadow-[0_0_24px_rgba(248,113,113,0.28)]"
              style={{ left: "88%", top: "70%" }}
            />
            <span
              className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-300/12"
              style={{ left: "88%", top: "70%" }}
            />
          </div>

          <div className="absolute bottom-7 left-7 right-7 border border-cyan-100/12 bg-[#020817]/56 px-4 py-4">
            <div className="font-osiris grid gap-2 text-[10px] uppercase tracking-[0.22em] text-slate-200/62 sm:text-[11px]">
              <span>KNOWN NODES: 06</span>
              <span>SIGNAL: LOST</span>
              <span>RECOVERY: HOME</span>
            </div>
            <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-100/22" />
          </div>

          <div className="font-osiris pointer-events-none absolute -right-1 -top-7 text-[9rem] leading-none text-cyan-100/[0.025] sm:text-[12rem]">
            404
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
