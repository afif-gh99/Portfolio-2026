function ContactLink({ href, label, ariaLabel, icon: Icon, isExternal = false }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      data-cursor="interactive"
      data-sound="click"
      data-sound-hover="hover"
      className="font-oxanium group relative inline-flex min-h-12 w-full items-center justify-center gap-2.5 overflow-hidden border border-cyan-100/22 bg-[#06101f]/58 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100 shadow-[0_16px_48px_rgba(0,0,0,0.26),0_0_22px_rgba(34,211,238,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none backdrop-blur-md transition duration-300 hover:border-cyan-100/55 hover:bg-cyan-100/[0.085] hover:text-cyan-50 hover:shadow-[0_18px_54px_rgba(0,0,0,0.32),0_0_30px_rgba(34,211,238,0.16)] focus-visible:ring-2 focus-visible:ring-cyan-200/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] sm:w-auto sm:min-w-44"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-px border border-cyan-50/0 transition duration-300 group-hover:border-cyan-50/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-16 w-14 -skew-x-12 bg-linear-to-r from-transparent via-cyan-100/18 to-transparent opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:left-[115%] group-hover:opacity-100"
      />
      {Icon ? (
        <Icon
          aria-hidden="true"
          focusable="false"
          className="relative z-10 h-4 w-4 shrink-0 text-cyan-100/62 transition duration-300 group-hover:text-cyan-50/86"
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </a>
  );
}

export default ContactLink;
