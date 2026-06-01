import { scrollToSection } from "../../../lib/sectionNavigation.js";

function SiteFooter() {
  return (
    <footer className="font-oxanium mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-3 border-t border-cyan-100/12 pt-5 text-[9px] font-medium uppercase leading-relaxed tracking-[0.13em] text-slate-300/62 sm:mt-12 sm:pt-6 sm:text-[10px] sm:tracking-[0.16em] lg:mt-14 lg:flex lg:items-center lg:justify-between lg:gap-4 lg:pt-7 lg:text-[11px] lg:leading-none lg:tracking-[0.18em]">
      <p className="min-w-0">© 2026 AFIF.GH</p>
      <p className="col-span-2 row-start-2 max-w-[17rem] text-slate-200/70 sm:max-w-none lg:col-auto lg:row-auto lg:max-w-none">
        INTERFACE CLOSED — UNTIL THE NEXT BUILD.
      </p>
      <button
        type="button"
        onClick={() => scrollToSection("home")}
        data-cursor="interactive"
        data-sound="click"
        data-sound-hover="hover"
        className="col-start-2 row-start-1 w-fit justify-self-end whitespace-nowrap border-0 bg-transparent p-0 text-right font-semibold text-cyan-100/82 outline-none transition duration-300 hover:text-cyan-50 focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020817] lg:col-auto lg:row-auto"
      >
        BACK TO TOP ↑
      </button>
    </footer>
  );
}

export default SiteFooter;
