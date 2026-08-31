export function BrandLogo({ className = "" }: { className?: string }) {
  return <span className={`inline-flex items-baseline font-semibold tracking-[-.04em] ${className}`} aria-label="AeroSight">
    <span aria-hidden="true">AeroS</span>
    <svg aria-hidden="true" viewBox="0 0 18 32" className="mx-[.02em] h-[1.05em] w-[.48em] self-center overflow-visible text-[var(--signal)]" fill="none">
      <path d="M9 14.5V31" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="9" cy="12.5" r="2.1" fill="currentColor" />
      <path d="M9 10.4 8.1.4c-.1-1.1 1.3-1.5 1.8-.5l2.6 8.8L9 10.4Z" fill="currentColor" />
      <path d="m10.8 13.6 9 4.2c1 .5.6 1.9-.5 1.8l-9.6-2.5 1.1-3.5Z" fill="currentColor" />
      <path d="m7.2 13.6-8.1 5.8c-.9.6-1.8-.5-1.1-1.3l7-7 2.2 2.5Z" fill="currentColor" />
    </svg>
    <span aria-hidden="true">ght</span>
  </span>;
}
