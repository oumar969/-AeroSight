export function BrandLogo({ className = "" }: { className?: string }) {
  return <span className={`brand-logo inline-flex items-center gap-[.22em] font-semibold tracking-[-.04em] ${className}`} aria-label="AeroSight">
    <svg aria-hidden="true" viewBox="0 0 42 42" className="h-[.88em] w-[.88em] shrink-0 overflow-visible" fill="none">
      <path d="M3.5 21c4.7-8 10.6-12 17.5-12s12.8 4 17.5 12C33.8 29 27.9 33 21 33S8.2 29 3.5 21Z" stroke="currentColor" strokeWidth="2.4" />
      <g className="brand-rotor" fill="var(--signal)">
        <circle cx="21" cy="21" r="3.2" />
        <path d="M21 17.8 18.8 4.3c-.3-1.8 2.1-2.4 2.9-.8l4.4 12-5.1 2.3Z" />
        <path d="m23.8 22.6 12.8 4.9c1.7.7 1 3-0.8 2.8l-12.6-2.2.6-5.5Z" />
        <path d="M18.4 23.1 7.8 31.7c-1.4 1.1-3-.7-1.9-2l9-9.2 3.5 2.6Z" />
      </g>
    </svg>
    <span aria-hidden="true">AeroSight</span>
  </span>;
}
