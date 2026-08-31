export function BrandLogo({ className = "" }: { className?: string }) {
  return <span className={`inline-flex items-baseline font-semibold tracking-[-.04em] ${className}`} aria-label="AeroSight">
    <span aria-hidden="true">AeroS</span>
    <span aria-hidden="true" className="relative inline-block">
      <span>ı</span>
      <svg viewBox="0 0 20 20" className="absolute left-1/2 top-[-.18em] h-[.38em] w-[.38em] -translate-x-1/2 -translate-y-full overflow-visible text-[var(--signal)]" fill="currentColor">
        <circle cx="10" cy="10" r="2.2" />
        <path d="M10 7.8 8.7.4C8.5-.7 10-.9 10.5.1l2.6 6.9L10 7.8Z" />
        <path d="m12 11.1 7 2.7c1 .4.6 1.8-.5 1.7l-7.2-1.3.7-3.1Z" />
        <path d="m8.1 11.2-5.8 4.7c-.8.7-1.8-.4-1.1-1.2l5.2-5.4 1.7 1.9Z" />
      </svg>
    </span>
    <span aria-hidden="true">ght</span>
  </span>;
}
