export function Logo({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <polygon points="0,60 20,25 40,60" fill="var(--orange)" />
      <polygon points="20,25 40,60 40,25" fill="var(--on-color)" opacity="0.9" />
      <polygon points="40,25 60,60 40,60" fill="var(--teal)" />
      <polygon points="20,25 30,5 40,25" fill="var(--on-color)" opacity="0.6" />
      <polygon points="30,5 50,5 40,25" fill="var(--orange)" opacity="0.8" />
    </svg>
  );
}
