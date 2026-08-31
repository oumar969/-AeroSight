export function BrandLogo({ className = "" }: { className?: string }) {
  return <span className={`brand-logo inline-flex items-center gap-[.12em] font-semibold tracking-[-.04em] ${className}`} aria-label="AeroSight">
    <span aria-hidden="true">AeroSight</span>
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-[.72em] w-[.72em] shrink-0 overflow-visible">
      <circle cx="16" cy="16" r="15" fill="var(--signal)" />
      <g className="brand-rotor" fill="var(--ink)">
        <circle cx="16" cy="15" r="2.2" />
        <path d="M16 12.9 14.5 4c-.2-1.2 1.4-1.6 1.9-.5l2.9 7.9-3.3 1.5Z" />
        <path d="m17.9 16.1 8.4 3.2c1.1.4.7 2-.5 1.9l-8.2-1.5.3-3.6Z" />
        <path d="m14.3 16.4-7 5.6c-.9.8-2-.5-1.2-1.3l5.9-6.1 2.3 1.8Z" />
      </g>
    </svg>
  </span>;
}
